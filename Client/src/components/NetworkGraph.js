
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const NetworkGraph = () => {
  const svgRef = useRef(null);
  const [nodes, setNodes] = useState([
    {
      id: "1",
      label: "User A",
      performance: "80%",
      role: "Leader",
      children: ["2", "3"],
    },
    {
      id: "2",
      label: "User B",
      performance: "60%",
      role: "Member",
      children: [],
    },
    {
      id: "3",
      label: "User C",
      performance: "75%",
      role: "Member",
      children: ["4"],
    },
    {
      id: "4",
      label: "User D",
      performance: "90%",
      role: "Member",
      children: [],
    },
  ]);
  const [links, setLinks] = useState([
    { source: "1", target: "2" },
    { source: "1", target: "3" },
    { source: "3", target: "4" },
  ]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = svg.node().clientWidth;
    const height = svg.node().clientHeight;

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    svg.selectAll("*").remove(); 

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);

    // Add nodes
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#007bff")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("mouseover", (event, d) => handleMouseOver(event, d))
      .on("mouseout", handleMouseOut);

    const text = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("dy", 4)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#fff")
      .text((d) => d.label);

    function handleMouseOver(event, d) {
      d3.select(event.target).attr("stroke", "#f00").attr("stroke-width", 3);
      d3.select(".tooltip")
        .style("opacity", 1)
        .html(
          `Label: ${d.label}<br>Performance: ${d.performance}<br>Role: ${d.role}`
        )
        .style("left", `${event.pageX}px`)
        .style("top", `${event.pageY}px`);
    }

    function handleMouseOut(event) {
      d3.select(event.target).attr("stroke", "#fff").attr("stroke-width", 2);
      d3.select(".tooltip").style("opacity", 0);
    }

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      text.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });

    return () => {
      simulation.stop();
    };
  }, [nodes, links]);

  return (
    <div className="p-4 bg-white shadow-md rounded-md w-[400px] h-[700px] mx-auto relative">
      <h2 className="text-2xl font-bold mb-4">Network Visualization</h2>
      <svg ref={svgRef} width="100%" height="100%" />
      <div className="tooltip absolute bg-black text-white p-2 rounded-md opacity-0 pointer-events-none"></div>
    </div>
  );
};

export default NetworkGraph;
