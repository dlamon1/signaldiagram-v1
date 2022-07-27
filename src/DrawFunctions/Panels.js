import { get } from "svelte/store";

import * as d3 from "d3";

import { svgRef, columns, rows } from "../store";

let svgns = "http://www.w3.org/2000/svg";
let hoveredColor = "rgba(0, 255, 170, 1)";
let selectedColor = "rgba(241, 89, 70, 1)";

export const drawPanelGroups = (panels) => {
  get(svgRef)
    .selectAll("svg")
    .data(panels)
    .enter()
    .append("svg")
    .attr("id", (d) => "p" + d.i)
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("width", (d) => d.width)
    .attr("height", (d) => d.height);

  panels.forEach((p) => {
    let rect = d3
      .select("#p" + p.i)
      .append("rect")
      .attr("id", (d) => "r" + d.i)
      .attr("width", p.width)
      .attr("height", p.height)
      .attr("fill", p.backgroundColor)
      .attr("stroke", p.borderColor)
      .attr("stroke-width", p.lineWidth);
  });
};

export const drawPanelCoordinates = (panels) => {
  panels.forEach((p) => {
    let rect = d3
      .select("#p" + p.i)
      .append("text")
      .text(p.column + 1 + "," + (p.row + 1))
      .attr("y", p.height / 12)
      .attr("x", p.width / 24)
      .style("font-size", p.width / 6 + "px");
  });
};

export const drawHoveredPanel = (panel) => {
  d3.select("#r" + panel.i).attr("fill", hoveredColor);
};

export const drawPanelSelectedOverlay = (panel) => {
  d3.select("#r" + panel.i).attr("fill", selectedColor);
  // let ref = document.getElementById("panel-" + panel.i);
  // let newRect = document.createElementNS(svgns, "rect");
  // newRect.setAttribute("width", panel.width);
  // newRect.setAttribute("height", panel.height);
  // newRect.setAttribute("fill-opacity", 0);
  // newRect.setAttribute("stroke", selectedColor);
  // newRect.setAttribute("stroke-width", 4);
  // ref.appendChild(newRect);
};
