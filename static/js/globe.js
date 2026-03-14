import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as topojson from "https://cdn.jsdelivr.net/npm/topojson-client@3/+esm";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const COLORS = {
  ocean:        "#1a2744",
  land:         "#2d3f5e",
  visited:      "#FF6B35",
  border:       "#1a2744",
  graticule:    "rgba(255,255,255,0.06)",
  visitedHover: "#ff8c5a",
  landHover:    "#3a5070",
};

const visitedCountries = await fetch("/data/visited_countries.json").then(r => r.json());
const INITIAL_ROTATION = [8, 0, 0]; // [yaw, pitch, roll] — centred on Ireland's longitude, equator latitude
const SPIN_SPEED       = 0.5;     // degrees per frame
const SPIN_RESUME_MS   = 2500;      // ms of inactivity before auto-spin resumes

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let projection, path, canvas, ctx, countries, countryFeatures;
let width, height, radius;
let rotation    = [...INITIAL_ROTATION];
let spinning    = true;
let spinTimeout = null;
let hoveredId   = null;
let rafId       = null;

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
export async function initGlobe(containerId = "globe-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Create canvas
  canvas = document.createElement("canvas");
  canvas.style.display = "block";
  canvas.style.cursor  = "grab";
  container.appendChild(canvas);

  // Create tooltip
  const tooltip = document.createElement("div");
  tooltip.id = "globe-tooltip";
  Object.assign(tooltip.style, {
    position:      "absolute",
    pointerEvents: "none",
    background:    "rgba(10,16,30,0.85)",
    color:         "#f0f4ff",
    padding:       "5px 10px",
    borderRadius:  "4px",
    fontSize:      "0.8rem",
    letterSpacing: "0.05em",
    opacity:       "0",
    transition:    "opacity 0.15s",
    whiteSpace:    "nowrap",
    border:        "1px solid rgba(255,255,255,0.12)",
  });
  container.style.position = "relative";
  container.appendChild(tooltip);

  // Load world data
  const world = await fetch("/data/world-110m.json").then(r => r.json());
  countries   = topojson.feature(world, world.objects.countries);

  // Build a lookup: numeric id → feature (for hover)
  countryFeatures = new Map(countries.features.map(f => [f.id, f]));

  // Build visited set using numeric ids from topojson
  // world-atlas encodes ids as numeric ISO 3166-1 numeric codes.
  // We map alpha-3 → numeric via a small inline table.
  const alpha3ToNumeric = buildAlpha3Map();
  const visitedSet      = new Set(
    visitedCountries.map(c => alpha3ToNumeric[c]).filter(Boolean)
  );

  // Projection + path
  projection = d3.geoOrthographic().clipAngle(90).precision(0.3);
  path       = d3.geoPath(projection, ctx);
  const graticule = d3.geoGraticule()();
  const sphere    = { type: "Sphere" };

  // ---------------------------------------------------------------------------
  // Resize
  // ---------------------------------------------------------------------------
  function resize() {
    width  = container.clientWidth;
    height = width; // square
    radius = width / 2;

    canvas.width  = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width  = width  + "px";
    canvas.style.height = height + "px";

    ctx = canvas.getContext("2d");
    ctx.scale(devicePixelRatio, devicePixelRatio);

    projection
      .scale(radius * 0.97)
      .translate([radius, radius]);

    path = d3.geoPath(projection, ctx);
    draw();
  }

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  // ---------------------------------------------------------------------------
  // Draw
  // ---------------------------------------------------------------------------
  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    projection.rotate(rotation);
    path = d3.geoPath(projection, ctx);

    // Ocean
    ctx.beginPath();
    path(sphere);
    ctx.fillStyle = COLORS.ocean;
    ctx.fill();

    // Graticule
    ctx.beginPath();
    path(graticule);
    ctx.strokeStyle = COLORS.graticule;
    ctx.lineWidth   = 0.5;
    ctx.stroke();

    // Countries
    for (const feature of countries.features) {
      const isVisited = visitedSet.has(feature.id);
      const isHovered = feature.id === hoveredId;

      ctx.beginPath();
      path(feature);

      if (isVisited) {
        ctx.fillStyle = isHovered ? COLORS.visitedHover : COLORS.visited;
      } else {
        ctx.fillStyle = isHovered ? COLORS.landHover : COLORS.land;
      }
      ctx.fill();
    }

    // Borders
    ctx.beginPath();
    path(topojson.mesh(world, world.objects.countries, (a, b) => a !== b));
    ctx.strokeStyle = COLORS.border;
    ctx.lineWidth   = 0.4;
    ctx.stroke();

    // Outer sphere stroke
    ctx.beginPath();
    path(sphere);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth   = 1;
    ctx.stroke();
  }

  // ---------------------------------------------------------------------------
  // Animation loop
  // ---------------------------------------------------------------------------
  function animate() {
    if (spinning) {
      rotation[0] += SPIN_SPEED;
    }
    draw();
    rafId = requestAnimationFrame(animate);
  }
  animate();

  // ---------------------------------------------------------------------------
  // Drag (pan / rotate)
  // ---------------------------------------------------------------------------
  let dragStart = null;
  let rotStart  = null;

  canvas.addEventListener("mousedown", e => {
    dragStart = [e.clientX, e.clientY];
    rotStart  = [...rotation];
    spinning  = false;
    clearTimeout(spinTimeout);
    canvas.style.cursor = "grabbing";
  });

  window.addEventListener("mousemove", e => {
    if (dragStart) {
      const dx = e.clientX - dragStart[0];
      const dy = e.clientY - dragStart[1];
      const scale = 0.3; // sensitivity
      rotation[0] = rotStart[0] + dx * scale;
      rotation[1] = Math.max(-60, Math.min(60, rotStart[1] - dy * scale));
    }
  });

  window.addEventListener("mouseup", () => {
    if (dragStart) {
      dragStart = null;
      canvas.style.cursor = "grab";
      scheduleSpinResume();
    }
  });

  // Touch support
  let touchStart = null;
  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    touchStart = [e.touches[0].clientX, e.touches[0].clientY];
    rotStart   = [...rotation];
    spinning   = false;
    clearTimeout(spinTimeout);
  }, { passive: false });

  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    if (!touchStart) return;
    const dx = e.touches[0].clientX - touchStart[0];
    const dy = e.touches[0].clientY - touchStart[1];
    rotation[0] = rotStart[0] + dx * 0.3;
    rotation[1] = Math.max(-60, Math.min(60, rotStart[1] - dy * 0.3));
  }, { passive: false });

  canvas.addEventListener("touchend", () => {
    touchStart = null;
    scheduleSpinResume();
  });

  function scheduleSpinResume() {
    clearTimeout(spinTimeout);
    spinTimeout = setTimeout(() => { spinning = true; }, SPIN_RESUME_MS);
  }

  // ---------------------------------------------------------------------------
  // Zoom (scroll)
  // ---------------------------------------------------------------------------
  canvas.addEventListener("wheel", e => {
    e.preventDefault();
    const currentScale = projection.scale();
    const newScale     = Math.max(radius * 0.5, Math.min(radius * 3, currentScale - e.deltaY * 0.5));
    projection.scale(newScale);
  }, { passive: false });

  // ---------------------------------------------------------------------------
  // Hover / tooltip
  // ---------------------------------------------------------------------------
  canvas.addEventListener("mousemove", e => {
    if (dragStart) return;

    const rect  = canvas.getBoundingClientRect();
    const mx    = e.clientX - rect.left;
    const my    = e.clientY - rect.top;
    const coord = projection.invert([mx, my]);

    let found = null;
    if (coord) {
      for (const feature of countries.features) {
        if (d3.geoContains(feature, coord)) {
          found = feature;
          break;
        }
      }
    }

    const newId = found ? found.id : null;
    if (newId !== hoveredId) {
      hoveredId = newId;
      // no need to call draw() here — the RAF loop handles it
    }

    if (found) {
      const name = found.properties?.name ?? "Unknown";
      tooltip.textContent = name;
      tooltip.style.opacity = "1";
      tooltip.style.left = (mx + 14) + "px";
      tooltip.style.top  = (my - 8) + "px";
    } else {
      tooltip.style.opacity = "0";
    }
  });

  canvas.addEventListener("mouseleave", () => {
    hoveredId = null;
    tooltip.style.opacity = "0";
  });
}

// ---------------------------------------------------------------------------
// Alpha-3 → numeric ISO lookup (subset — extend as needed)
// world-atlas uses ISO 3166-1 numeric codes as feature IDs.
// ---------------------------------------------------------------------------
function buildAlpha3Map() {
  return {
    AFG:"004",AGO:"024",ALB:"008",AND:"020",ARE:"784",ARG:"032",ARM:"051",AUS:"036",
    AUT:"040",AZE:"031",BDI:"108",BEL:"056",BEN:"204",BFA:"854",BGD:"050",BGR:"100",
    BHR:"048",BHS:"044",BIH:"070",BLR:"112",BLZ:"084",BOL:"068",BRA:"076",BRN:"096",
    BTN:"064",BWA:"072",CAF:"140",CAN:"124",CHE:"756",CHL:"152",CHN:"156",CIV:"384",
    CMR:"120",COD:"180",COG:"178",COL:"170",COM:"174",CPV:"132",CRI:"188",CUB:"192",
    CYP:"196",CZE:"203",DEU:"276",DJI:"262",DNK:"208",DOM:"214",DZA:"012",ECU:"218",
    EGY:"818",ERI:"232",ESP:"724",EST:"233",ETH:"231",FIN:"246",FJI:"242",FRA:"250",
    GAB:"266",GBR:"826",GEO:"268",GHA:"288",GIN:"324",GMB:"270",GNB:"624",GNQ:"226",
    GRC:"300",GTM:"320",GUY:"328",HND:"340",HRV:"191",HTI:"332",HUN:"348",IDN:"360",
    IND:"356",IRL:"372",IRN:"364",IRQ:"368",ISL:"352",ISR:"376",ITA:"380",JAM:"388",
    JOR:"400",JPN:"392",KAZ:"398",KEN:"404",KGZ:"417",KHM:"116",KIR:"296",KOR:"410",
    KWT:"414",LAO:"418",LBN:"422",LBR:"430",LBY:"434",LIE:"438",LKA:"144",LSO:"426",
    LTU:"440",LUX:"442",LVA:"428",MAR:"504",MDA:"498",MDG:"450",MDV:"462",MEX:"484",
    MKD:"807",MLI:"466",MLT:"470",MMR:"104",MNE:"499",MNG:"496",MOZ:"508",MRT:"478",
    MUS:"480",MWI:"454",MYS:"458",NAM:"516",NER:"562",NGA:"566",NIC:"558",NLD:"528",
    NOR:"578",NPL:"524",NRU:"520",NZL:"554",OMN:"512",PAK:"586",PAN:"591",PER:"604",
    PHL:"608",PLW:"585",PNG:"598",POL:"616",PRK:"408",PRT:"620",PRY:"600",PSE:"275",
    QAT:"634",ROU:"642",RUS:"643",RWA:"646",SAU:"682",SDN:"729",SEN:"686",SGP:"702",
    SLB:"090",SLE:"694",SLV:"222",SOM:"706",SRB:"688",SSD:"728",STP:"678",SUR:"740",
    SVK:"703",SVN:"705",SWE:"752",SWZ:"748",SYC:"690",SYR:"760",TCD:"148",TGO:"768",
    THA:"764",TJK:"762",TKM:"795",TLS:"626",TON:"776",TTO:"780",TUN:"788",TUR:"792",
    TUV:"798",TZA:"834",UGA:"800",UKR:"804",URY:"858",USA:"840",UZB:"860",VEN:"862",
    VNM:"704",VUT:"548",WSM:"882",YEM:"887",ZAF:"710",ZMB:"894",ZWE:"716",
  };
}
