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
  snapPoints,
} from "../store";

import {
  // handlePanelClick,
  handleSnapPointStart,
  handleSnapPointEnd,
  handleSnapPointClick,
} from "../functions/HandleSelect";

let hoveredColor = "rgba(0, 255, 170, 1)";
let selectedColor = "rgba(241, 89, 70, 1)";

export const drawPanelGroups = (panels) => {
  let p = panels.array;
  let dim = get(screenAndPanelDimensions);
  let signalLineClass = get(signalLines);
  let panelDimension = dim.panelDimension;
  let topPadding = dim.topPadding;
  let leftPadding = dim.leftPadding;
  let ratio = get(width) / get(height);

  let snapPointClass = get(snapPoints);
  let sp = snapPointClass.array;

  // console.log(p);
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
      .attr("fill", p.color.background)
      .attr("stroke", (p) => (p.isSelected ? selectedColor : p.color.border))
      .attr("stroke-width", (p) =>
        p.isSelected ? p.lineWidth * 4 : p.lineWidth
      )
      .on("click", (e) => get(isSelectMode) && panels.selectPanel(e));

    d3.select("#p" + p.i)
      .selectAll("circle")
      .data(p.thisPanelsSnapPoints)
      .enter()
      .append("rect")
      .attr("width", (d) => sp[d].radius * 2)
      .attr("height", (d) => sp[d].radius * 2)
      .attr("x", (d) => sp[d].x - sp[d].radius)
      .attr("y", (d) => sp[d].y - sp[d].radius)
      .attr("rx", (d) => sp[d].radius)
      .attr("fill", (d) =>
        sp[d].isSelected ? selectedColor : sp[d].color.background
      )
      .attr("stroke", (d) => sp[d].color.border)
      .attr("class", "hover")
      .on("mousedown", (e) => {
        get(isDrawMode) && signalLineClass.setOrigin(e);
      })
      .on("mouseup", (e) => get(isDrawMode) && signalLineClass.addSignalLine(e))
      .on(
        "click",
        (e) => !get(isDrawMode) && snapPointClass.selectSnapPoint(e)
      );
  });

  let lineGroup = get(svgRef)
    .selectAll("g")
    .data(signalLineClass.array)
    .enter()
    .append("g")
    .attr("id", (d) => "lgroup" + d.i);

  // Line Outline
  lineGroup
    .append("line")
    .attr("id", (d) => "line-outline" + d.i)
    .attr("x1", (d) => d.origin.x)
    .attr("y1", (d) => d.origin.y)
    .attr("x2", (d) => d.end.x)
    .attr("y2", (d) => d.end.y)
    // .attr("stroke", (d) => (d.isSelected ? "#ff0000" : "blue"))
    .attr("stroke-width", (d) => d.lineWidth)
    // .attr("stroke", "none")
    .attr("stroke-width", (d) => d.lineWidth * 4)
    .attr("pointer-events", "visible")
    .on("mouseover", (e, d) => {
      // console.log(e);
      // console.log(d);
      get(isSelectMode) && d3.select(e.path[0]).attr("stroke", hoveredColor);
    })
    .on("mouseout", (e) => {
      get(isSelectMode) && d3.select(e.path[0]).attr("stroke", "none");
    });
  // .on("click", (e) => {
  //   let i = e.path[0].__data__.i;
  //   // console.log(signalLineClass.array[i]);
  //   get(isSelectMode) && signalLineClass.array[i].selectSignalLine(e);
  // });

  // Line
  lineGroup
    .append("line")
    .attr("id", (d) => "l" + d.i)
    .attr("x1", (d) => d.origin.x)
    .attr("y1", (d) => d.origin.y)
    .attr("x2", (d) => d.end.x)
    .attr("y2", (d) => d.end.y)
    .attr("stroke", (d) => (d.isSelected ? "#ff0000" : d.color.background))
    .attr("stroke-width", (d) => d.lineWidth * 2)
    .attr("point-events", "none")
    .on("mouseover", (e, d) => {
      get(isSelectMode) &&
        d3
          .select("#line-outline" + e.srcElement.__data__.i)
          .attr("stroke", hoveredColor);
    })
    .on("mouseout", (e) => {
      get(isSelectMode) && d3.select(e.relatedTarget).attr("stroke", "none");
    });

  // lineGroup.append("p");

  // lineGroup
  //   .selectAll("line")
  //   .data(signalLineClass.array)
  //   .enter()
  // .append("line")
  // .attr("x1", (d) => d.origin.x)
  // .attr("y1", (d) => d.origin.y)
  // .attr("x2", (d) => d.end.x)
  // .attr("y2", (d) => d.end.y)
  // .attr("stroke", (d) => (d.isSelected ? "#ff0000" : d.color.background))
  // .attr("stroke-width", (d) => d.lineWidth * 2)
  // .attr("point-events", "none");

  // .attr("stroke", "none")
  // .attr("stroke-width", (d) => d.lineWidth * 4)
  // .attr("pointer-events", "visible")
  // .on("mouseover", (e) => {
  //   d3.select(e.path[0]).attr("stroke", hoveredColor);
  // })
  // .on("mouseout", (e) => {
  //   d3.select(e.path[0]).attr("stroke", e.path[0].__data__.color.background);
  // })
  // .on("click", (e) => {
  //   let i = e.path[0].__data__.i;
  //   // console.log(signalLineClass.array[i]);
  //   get(isSelectMode) && signalLineClass.array[i].selectSignalLine(e);
  // });
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
