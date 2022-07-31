import { get } from "svelte/store";

import * as d3 from "d3";

import {
  svgRef,
  columns,
  rows,
  isRearView,
  panels,
  setPanels,
  screenAndPanelDimensions,
  width,
  height,
  snapPointDirection,
  snapPointsQuantity,
  isSelectMode,
  signalLines,
  isDrawMode,
} from "../store";

import {
  handlePanelClick,
  handleSnapPointStart,
  handleSnapPointEnd,
  handleSnapPointClick,
} from "../functions/HandleSelect";

let hoveredColor = "rgba(0, 255, 170, 1)";
let selectedColor = "rgba(241, 89, 70, 1)";

export const drawPanelGroups = (p) => {
  let dim = get(screenAndPanelDimensions);
  let _signalLines = get(signalLines);
  console.log(_signalLines);
  let panelDimension = dim.panelDimension;
  let topPadding = dim.topPadding;
  let leftPadding = dim.leftPadding;
  let ratio = get(width) / get(height);

  // console.log("drawPanelGroups");

  get(svgRef)
    .selectAll("svg")
    .data(p)
    .enter()
    .append("svg")
    .attr("id", (d) => "p" + d.i)
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("width", (d) => d.width)
    .attr("height", (d) => d.height);

  p.forEach((p) => {
    let rect = d3
      .select("#p" + p.i)
      .append("rect")
      .attr("id", (d) => "r" + d.i)
      .attr("class", get(isSelectMode) && "hover")
      .attr("width", p.width)
      .attr("height", p.height)
      .attr("fill", p.backgroundColor)
      .attr("stroke", (p) => (p.isSelected ? selectedColor : p.borderColor))
      .attr("stroke-width", (p) => (p.isSelected ? 4 : p.lineWidth))
      .on("click", (e) => get(isSelectMode) && handlePanelClick(e));

    d3.select("#p" + p.i)
      .selectAll("circle")
      .data(p.thisPanelsSnapPoints)
      .enter()
      .append("rect")
      .attr("width", (d) => d.radius * 2)
      .attr("height", (d) => d.radius * 2)
      .attr("x", (d) => d.x - d.radius)
      .attr("y", (d) => d.y - d.radius)
      .attr("rx", (d) => d.radius)
      .attr("fill", (d) => (d.isSelected ? selectedColor : d.color.background))
      .attr("stroke", (d) => d.color.border)
      .attr("class", "hover")
      .on("mousedown", (e) => {
        get(isDrawMode) && handleSnapPointStart(e);
      })
      .on("mouseup", (e) => get(isDrawMode) && handleSnapPointEnd(e))
      .on("click", (e) => !get(isDrawMode) && handleSnapPointClick(e));
  });

  get(svgRef)
    .selectAll("line")
    .data(_signalLines.array)
    .enter()
    .append("line")
    .attr("x1", (d) => d.origin.x)
    .attr("y1", (d) => d.origin.y)
    .attr("x2", (d) => d.end.x)
    .attr("y2", (d) => d.end.y)
    .attr("stroke", (d) => d.color.background)
    .attr("stroke-width", (d) => d.lineWidth);
};

/* <line x1="0" y1="80" x2="100" y2="20" stroke="black" /> */

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
    .style("font-size", p.width / 6 + "px")
    .style("pointer-events", "none")
    .style("user-select", "none");
};

export const drawHoveredPanel = (panel) => {
  d3.select("#r" + panel.i).attr("fill", hoveredColor);
};

export const drawSelectedPanel = (panel) => {
  d3.select("#r" + panel.i)
    .attr("stroke", selectedColor)
    .attr("stroke-width", 8);
};
