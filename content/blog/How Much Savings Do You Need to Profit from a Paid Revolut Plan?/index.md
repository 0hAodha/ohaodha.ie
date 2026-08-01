+++
title = 'How Much Savings Do You Need to Profit From a Paid Revolut Plan?'
date = 2026-01-24T16:37:19Z
draft = false
+++

<div id="line-graph"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
<script>
const margin = {top: 20, right: 120, bottom: 60, left: 60};
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("#line-graph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Revolut plans: AER and monthly cost (€)
const plans = [
  { name: "Standard", rate: 0.015, monthly: 0, color: "#999" },
  { name: "Premium", rate: 0.015, monthly: 8.99, color: "#377eb8" },
  { name: "Metal", rate: 0.02, monthly: 15.99, color: "#984ea3" },
  { name: "Ultra", rate: 0.0225, monthly: 55, color: "#e41a1c" }
];

// Calculate monthly profit/loss for each plan
const calculateProfit = (savings, plan) => {
  const monthlyInterest = (savings * plan.rate) / 12;
  return monthlyInterest - plan.monthly;
};

// Find break-even point (where profit = 0)
const calculateBreakEven = (plan) => {
  if (plan.monthly === 0) return 0;
  return (plan.monthly * 12) / plan.rate;
};

// Add break-even info to plans
plans.forEach(plan => {
  plan.breakEven = calculateBreakEven(plan);
});

// Generate data points for x-axis (savings amount)
const maxSavings = 200000;
const data = d3.range(0, maxSavings + 1000, 1000);

// Calculate min and max profit values across all plans
let minProfit = 0;
let maxProfit = 0;
plans.forEach(plan => {
  data.forEach(savings => {
    const profit = calculateProfit(savings, plan);
    minProfit = Math.min(minProfit, profit);
    maxProfit = Math.max(maxProfit, profit);
  });
});

// Add 10% padding to the domain
const padding = (maxProfit - minProfit) * 0.1;

const xScale = d3.scaleLinear()
  .domain([0, maxSavings])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([minProfit - padding, maxProfit + padding])
  .range([height, 0]);

const line = d3.line()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y));

// Draw lines for each plan
plans.forEach(plan => {
  const lineData = data.map(x => ({x: x, y: calculateProfit(x, plan)}));
  
  svg.append("path")
    .datum(lineData)
    .attr("fill", "none")
    .attr("stroke", plan.color)
    .attr("stroke-width", 2.5)
    .attr("d", line);
  
  // Mark break-even point
  if (plan.breakEven > 0 && plan.breakEven <= maxSavings) {
    svg.append("circle")
      .attr("cx", xScale(plan.breakEven))
      .attr("cy", yScale(0))
      .attr("r", 6)
      .attr("fill", plan.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2);
    
    svg.append("text")
      .attr("x", xScale(plan.breakEven))
      .attr("y", yScale(0) - 12)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .style("fill", plan.color)
      .text(`€${Math.round(plan.breakEven).toLocaleString()}`);
  }
});

// X-axis
svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale).tickFormat(d => `€${d/1000}k`));

svg.append("text")
  .attr("x", width / 2)
  .attr("y", height + 45)
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .style("font-weight", "bold")
  .text("Savings Amount");

// Y-axis
svg.append("g")
  .call(d3.axisLeft(yScale));

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", -45)
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .style("font-weight", "bold")
  .text("Monthly Profit/Loss (€)");

// Zero line (break-even threshold)
svg.append("line")
  .attr("x1", 0)
  .attr("x2", width)
  .attr("y1", yScale(0))
  .attr("y2", yScale(0))
  .attr("stroke", "#333")
  .attr("stroke-width", 2)
  .attr("stroke-dasharray", "5,5");

svg.append("text")
  .attr("x", width - 5)
  .attr("y", yScale(0) - 5)
  .attr("text-anchor", "end")
  .style("font-size", "12px")
  .style("fill", "#333")
  .text("Break-even line");

// Legend
const legend = svg.append("g")
  .attr("transform", `translate(${width + 15}, 20)`);

plans.forEach((plan, i) => {
  const g = legend.append("g")
    .attr("transform", `translate(0, ${i * 25})`);
  
  g.append("line")
    .attr("x1", 0)
    .attr("x2", 25)
    .attr("y1", 0)
    .attr("y2", 0)
    .attr("stroke", plan.color)
    .attr("stroke-width", 2.5);
  
  g.append("text")
    .attr("x", 30)
    .attr("y", 4)
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .text(plan.name);
  
  g.append("text")
    .attr("x", 30)
    .attr("y", 16)
    .style("font-size", "10px")
    .style("fill", "#666")
    .text(`${(plan.rate * 100).toFixed(2)}% AER, €${plan.monthly}/mo`);
});

// Tooltip
const tooltip = d3.select("#line-graph")
  .append("div")
  .style("position", "absolute")
  .style("background", "white")
  .style("padding", "10px")
  .style("border", "2px solid #333")
  .style("border-radius", "6px")
  .style("pointer-events", "none")
  .style("opacity", 0)
  .style("font-size", "12px")
  .style("box-shadow", "0 2px 4px rgba(0,0,0,0.2)");

const focus = svg.append("g")
  .style("display", "none");

plans.forEach(plan => {
  focus.append("circle")
    .attr("r", 5)
    .attr("fill", plan.color)
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("class", `focus-${plan.name}`);
});

svg.append("rect")
  .attr("width", width)
  .attr("height", height)
  .style("fill", "none")
  .style("pointer-events", "all")
  .on("mouseover", () => focus.style("display", null))
  .on("mouseout", () => {
    focus.style("display", "none");
    tooltip.style("opacity", 0);
  })
  .on("mousemove", function(event) {
    const [mx, my] = d3.pointer(event);
    const savings = xScale.invert(mx);
    
    let tooltipText = `<strong>Savings: €${Math.round(savings).toLocaleString()}</strong><br><br>`;
    
    plans.forEach(plan => {
      const profit = calculateProfit(savings, plan);
      const monthlyInterest = (savings * plan.rate) / 12;
      
      tooltipText += `<strong style="color:${plan.color}">${plan.name}:</strong><br>`;
      tooltipText += `  Interest: €${monthlyInterest.toFixed(2)}/mo<br>`;
      tooltipText += `  Cost: €${plan.monthly.toFixed(2)}/mo<br>`;
      tooltipText += `  Net: <strong>€${profit.toFixed(2)}/mo</strong><br>`;
      
      if (plan.breakEven > 0) {
        const status = savings >= plan.breakEven ? "✓ Worth it" : "✗ Not worth it";
        tooltipText += `  ${status}<br>`;
      }
      tooltipText += `<br>`;
      
      focus.select(`.focus-${plan.name}`)
        .attr("cx", xScale(savings))
        .attr("cy", yScale(profit));
    });
    
    tooltip
      .html(tooltipText)
      .style("left", (event.pageX + 15) + "px")
      .style("top", (event.pageY - 15) + "px")
      .style("opacity", 1);
  });
</script>
