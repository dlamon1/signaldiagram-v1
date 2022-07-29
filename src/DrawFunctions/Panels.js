import { get } from "svelte/store";

import * as d3 from "d3";

import { svgRef, columns, rows, isRearView } from "../store";

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

export const drawPanelCoordinates = (p) => {
  let column, row;
  if (get(isRearView)) {
    column = get(columns) - p.column;
    row = get(rows) - p.row;
  } else {
    column = p.column + 1;
    row = p.row + 1;
  }

  d3.select("#p" + p.i)
    .append("text")
    .text(column + "," + row)
    .attr("y", p.height / 12)
    .attr("x", p.width / 24)
    .style("font-size", p.width / 6 + "px");
};

export const drawHoveredPanel = (panel) => {
  d3.select("#r" + panel.i).attr("fill", hoveredColor);
};

export const drawSelectedPanel = (panel) => {
  d3.select("#r" + panel.i)
    .attr("stroke", selectedColor)
    .attr("stroke-width", 8);
};
