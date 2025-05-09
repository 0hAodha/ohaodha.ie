+++
title = 'Tags'
date = 2023-01-01T08:30:00-07:00
draft = false
+++

{{< raw >}}
<style>
    svg text {
        fill: currentColor;
    }
</style>
<svg></svg>

<script type="module">
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawChart() {
    const response = await fetch("/blog/graph.json");
    const data = await response.json();

    const width = 1000;
    const height = 600;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const links = data.links.map(d => ({ ...d }));
    const nodes = data.nodes.map(d => ({ ...d }));

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-500))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value || 1));

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", d => d.title ? 12 : 8)
        .attr("fill", d => d.title ? "#B0CFFF" : "#FFA7CE")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title").text(d => d.id);

    const label = svg.append("g")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(nodes)
        .join("a")
        .attr("xlink:href", d => d.title ? `/blog/${d.id}` : `/tags/${d.id}`)
        .attr("target", "_blank") // Open in new tab
        .append("text")
        .attr("font-family", d => d.title ? "inherit" : "monospace")
        .attr("font-size", d => d.title ? 16 : 12)
        .text(d => d.title ? d.title : "#" + d.id);

    simulation
        .force("labelCollision", d3.forceCollide()
        .radius(20)
        .strength(0.5));

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label
            .attr("x", d => d.x)
            .attr("y", d => d.y - 12);
    });

    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    document.querySelector("svg").replaceWith(svg.node());
}

drawChart();
</script>
{{< /raw >}}
