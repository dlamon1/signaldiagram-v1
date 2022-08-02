import { get } from "svelte/store";

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
  canvasWrapperWidth,
  canvasWrapperHeight,
  setIsDrawingSignalLine,
  isDrawingSignalLine,
  mouseCoordinates,
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

  let snapPointElements;
  let panelSvgElement;
  let panelElements;
  let lineGroupElements;

  const handleMouseMove = (e) => {
    e.stopPropagation();
    get(isDrawingSignalLine) && get(mouseCoordinates).setMouseEnd(e);
  };

  // console.log(p);
  panelSvgElement = get(svgRef)
    .selectAll("svg")
    .data(p)
    .enter()
    .append("svg")
    .attr("id", (d) => "panel-group" + d.i)
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("width", (d) => d.width)
    .attr("height", (d) => d.height)
    // .style("pointer-events", "none")
    .on("mouseover", (e) => {
      e.stopPropagation();
      if (get(isDrawingSignalLine)) {
        handleMouseMove(e);
        // get(mouseCoordinates).setMouseEnd(e);
      }
    });

  panelSvgElement
    .append("rect")
    .attr("id", (d) => "panel-rectangle" + d.i)
    .attr("class", get(isSelectMode) && "hover")
    .attr("width", (d) => d.width)
    .attr("height", (d) => d.height)
    .attr("fill", (d) => d.color.background)
    .attr("stroke", (p) => (p.isSelected ? selectedColor : p.color.border))
    .attr("stroke-width", (p) => (p.isSelected ? p.lineWidth * 4 : p.lineWidth))
    .on("click", (e) => get(isSelectMode) && panels.selectPanel(e));

  snapPointElements = panelSvgElement
    .selectAll("circle")
    .data((d) => d.thisPanelsSnapPoints)
    .enter()
    .append("rect")
    .attr("id", (d) => "snap-point-circle" + d)
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
    .on("mouseover", (e) => {
      e.stopPropagation();
      clearAllPanelHoveredStates();
    })
    .on("mousedown", (e) => {
      e.stopPropagation();

      if (get(isDrawMode)) {
        signalLineClass.setOrigin(e);
        get(mouseCoordinates).setMouseClickOrigin(e);
        setIsDrawingSignalLine(true);
      }
    })
    .on("mouseup", (e) => {
      setIsDrawingSignalLine(false);
      if (get(isDrawMode)) {
        signalLineClass.addSignalLine(e);
        setIsDrawingSignalLine(false);
      }
    })
    .on("click", (e) => {
      if (!get(isDrawMode)) {
        e.stopPropagation();
        return snapPointClass.selectSnapPoint(e);
      }
      // if (get(isDrawMode)) {
      //   return console.log("begin drawing");
      // }
    });

  const clearAllPanelHoveredStates = () => {
    // console.log("clearing");
    // lineOutlineElements.attr("stroke", "none");
  };

  lineGroupElements = get(svgRef)
    .selectAll("g")
    .data(signalLineClass.array)
    .enter()
    .append("g")
    .attr("id", (d) => "line-group" + d.i);

  // TODO: create a function to get the origin without relying on the
  // signal line clas  array
  if (get(isDrawingSignalLine)) {
    get(svgRef)
      .append("line")
      .attr("x1", (d, i) => {
        console.log(signalLineClass.origin.snapPointIndex);
        let x = signalLineClass.getOriginCoordinates(
          null,
          signalLineClass.origin.snapPointIndex,
          "origin"
        );
        console.log(x);
        return get(mouseCoordinates).origin.x;
      })
      .attr("y1", (d, i) => get(mouseCoordinates).origin.y)
      .attr("x2", (d, i) => get(mouseCoordinates).end.x)
      .attr("y2", (d, i) => get(mouseCoordinates).end.y)
      .attr("stoke-width", 3)
      .attr("stroke", "#000");
  }

  // Line Outline
  let lineOutlineElements = lineGroupElements
    .append("line")
    .attr("id", (d) => "line-outline" + d.i)
    .attr(
      "x1",
      (d, i) => signalLineClass.getOriginCoordinates(d, i, "origin").x
    )
    .attr(
      "y1",
      (d, i) => signalLineClass.getOriginCoordinates(d, i, "origin").y
    )
    .attr("x2", (d, i) => signalLineClass.getOriginCoordinates(d, i, "end").x)
    .attr("y2", (d, i) => signalLineClass.getOriginCoordinates(d, i, "end").y)
    .attr("stroke", "none")
    .attr("stroke-width", (d) => d.lineWidth * 4)
    .attr("pointer-events", "visible")
    .on("mouseover", (e, d) => {
      e.stopPropagation();
      get(isSelectMode) && d3.select(e.path[0]).attr("stroke", hoveredColor);
    })
    .on("mouseout", (e) => {
      e.stopPropagation();
      get(isSelectMode) && d3.select(e.path[0]).attr("stroke", "none");
    })
    .on("click", (e) => {});

  // Line
  lineGroupElements
    .append("line")
    .attr("id", (d) => "line" + d.i)
    .attr(
      "x1",
      (d, i) => signalLineClass.getOriginCoordinates(d, i, "origin").x
    )
    .attr(
      "y1",
      (d, i) => signalLineClass.getOriginCoordinates(d, i, "origin").y
    )
    .attr("x2", (d, i) => signalLineClass.getOriginCoordinates(d, i, "end").x)
    .attr("y2", (d, i) => signalLineClass.getOriginCoordinates(d, i, "end").y)
    .attr("stroke", (d) => {
      if (d.isSelected) {
        return selectedColor;
      } else {
        return d.color.background;
      }
    })
    .attr("stroke-width", (d) => d.lineWidth * 2)
    .attr("point-events", "none")
    .on("mouseover", (e, d) => {
      e.stopPropagation();
      get(isSelectMode) &&
        d3
          .select("#line-outline" + e.srcElement.__data__.i)
          .attr("stroke", hoveredColor);
    })
    .on("mouseout", (e) => {
      e.stopPropagation();
      get(isSelectMode) && d3.select(e.relatedTarget).attr("stroke", "none");
    })
    .on("click", (e) => {
      let i = e.path[0].__data__.i;
      // console.log(signalLineClass.array[i]);
      get(isSelectMode) && signalLineClass.array[i].selectSignalLine(e);
    });

  let rearViewLabel = get(svgRef)
    .append("text")
    .text(() => (get(isRearView) ? "REAR VIEW" : ""))
    .attr("id", "rear-view-label")
    .attr("x", get(canvasWrapperWidth) / 2)
    .attr("y", get(canvasWrapperHeight) / 2)
    .attr("fill", "#000")
    .attr("font-size", () => {
      let screenWidth =
        get(columns) * get(screenAndPanelDimensions).panelDimension;
      let screenHeight =
        get(rows) * get(screenAndPanelDimensions).panelDimension;
      return screenWidth / 10 + "px";
    })
    .style("opacity", 0.125)
    .attr("text-anchor", "middle")
    .attr("font-famliy", "'Heebo', sans-serif;")
    .style("pointer-events", "none")
    .style("user-select", "none")
    .style("font-weight", "500")
    .attr("dominant-baseline", "central")
    .attr("transform-origin", "50% 50%")
    .attr("transform", () => {
      let opposite =
        (get(columns) *
          get(screenAndPanelDimensions).panelDimension *
          get(width)) /
          get(height) -
        150;
      let adjacent =
        get(rows) * get(screenAndPanelDimensions).panelDimension - 150;
      let angle = Math.atan(adjacent / opposite);
      angle = ((-angle * 180) / Math.PI) * 0.8;

      return "rotate(" + angle + ")";
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

  d3.select("#panel-group" + p.i)
    .append("text")
    .text(column + "," + row)
    .attr("y", p.height / 12)
    .attr("x", p.width / 24)
    .style("font-size", p.width / 6 + "px")
    .style("pointer-events", "none")
    .style("user-select", "none");
};
