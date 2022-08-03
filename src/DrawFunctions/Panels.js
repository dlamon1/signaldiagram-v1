import { get } from "svelte/store";

import {
  svgRef,
  columns,
  rows,
  isRearView,
  screenAndPanelDimensions,
  width,
  height,
  isSelectMode,
  signalLines as signalLineStore,
  isDrawMode,
  snapPoints as snapPointsStore,
  panels as panelsStore,
  canvasWrapperWidth,
  canvasWrapperHeight,
  setIsDrawingSignalLine,
  isDrawingSignalLine,
  mouseCoordinates,
} from "../store";

let hoveredColor = "rgba(0, 255, 170, 1)";
let selectedColor = "rgba(241, 89, 70, 1)";

export const drawPanelGroups = () => {
  let panelsClass = get(panelsStore);
  let snapPointClass = get(snapPointsStore);
  let signalLineClass = get(signalLineStore);

  let panels = panelsClass.array;
  let snapPoints = snapPointClass.array;
  let signalLines = signalLineClass.array;

  let snapPointGroupElement;
  let panelSvgElement;
  let panelElements;
  let lineGroupElements;

  // d3.select("g-onhover").on("mousemove", function (d, i) {
  //   console.log("mouse over");
  //   if (get(isDrawMode) && get(isDrawingSignalLine)) {
  //     console.log("check passed");
  //     signalLineClass.setEnd(d);
  //     // temporarySignalLine.attr("x2", d.x).attr("y2", d.y);
  //     // signalLineClass.setOrigin(d);
  //   }
  //   // d.stopPropagation();
  // });

  // Draw a G for each Panel
  panelSvgElement = get(svgRef)
    .selectAll("svg")
    .data(panels)
    .enter()
    .append("svg")
    .attr("id", (d) => "panel-group" + d.i)
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("width", (d) => d.width)
    .attr("height", (d) => d.height)
    .style("point-events", get(isDrawingSignalLine) && "none");

  // Draw Panel that Fills the G
  panelSvgElement
    .append("rect")
    .attr("id", (d) => "panel-rectangle" + d.i)
    .attr("class", get(isSelectMode) && "hover")
    .attr("width", (d) => {
      // if (d.i == 1) console.log(d.width);
      return d.width;
    })
    .attr("height", (d) => d.height)
    .attr("fill", (d) => d.color.background)
    .attr("stroke", (d) => {
      if (d.isSelected) {
        return selectedColor;
      }
      if (d.isHovered) {
        return hoveredColor;
      }
      return d.color.border;
    })
    .attr("stroke-width", (d) => (d.isSelected ? d.lineWidth * 4 : d.lineWidth))
    .style("point-events", get(isDrawingSignalLine) && "none")
    .on("mouseover", function (d, i) {
      // d.stopPropagation();
      if (get(isDrawMode)) {
        // get(signalLineClass).setEnd(d);
        return;
      }
      let obj = d.path[0].__data__;
      d3.select(this).attr("fill", hoveredColor);

      // .attr("stroke-width", obj.lineWidth * 4);
    })
    .on("mouseout", function (d, i) {
      // d.stopPropagation();
      if (get(isDrawMode)) return;
      let obj = d.path[0].__data__;
      d3.select(this).attr("fill", obj.color.background);
      // .attr("stroke-width", obj.lineWidth);
    })
    .on("mousemove", function (d) {
      if (!get(isDrawMode)) return;
      // console.log("move");
      // get(isDrawingSignalLine) && get(mouseCoordinates).setMouseEnd(e);
      get(signalLineClass).nullDestinationSnapPointIndex();
      get(signalLineClass).setMousePosition(d);
    })
    .on("mouseup", function (d) {
      console.log("mouseup");
      get(signalLineClass).nullDestinationSnapPointIndex();
      get(signalLineClass).nullDestinationSnapPointIndex();
      get(signalLineClass).setMousePosition({ x: 0, y: 0 });

      d3.select("#temp-signal-line")
        .attr("x1", null)
        .attr("y1", null)
        .attr("x2", null)
        .attr("y2", null);

      setIsDrawingSignalLine(false);

      // d3.select("#temp-signal-line").remove();

      // get(svgRef).append("line").attr("id", "temp-signal-line");
    })
    .on("click", (d) => {
      // d.stopPropagation();
      if (get(isDrawMode)) return;
      get(isSelectMode) &&
        !get(isDrawingSignalLine) &&
        panelsClass.selectPanel(d);
    });

  // Draw Snap Point Elements
  // Draw Snap Point Elements
  // Draw Snap Point Elements
  snapPointGroupElement = get(svgRef)
    .selectAll("circle")
    .data(snapPoints)
    .enter()
    .append("circle")
    .attr("id", (d) => "snap-point-circle" + d)
    // .attr("fake", (d) => console.log(snapPointClass.getXCoordinate(d)))
    .attr("cx", (d) => snapPointClass.getXCoordinate(d))
    .attr("cy", (d) => snapPointClass.getYCoordinate(d))
    .attr("r", (d) => (get(isDrawMode) ? d.radius * 2 : d.radius))
    .style("point-events", get(isDrawingSignalLine) && "none")
    .attr("fill", (d) =>
      d.isSelected && !get(isDrawingSignalLine)
        ? selectedColor
        : d.color.background
    )
    .style("paint-order", "stroke")
    .attr("stroke-alignment", "inner")
    .attr("stroke", (d) => {
      if (d.isSelected) {
        return selectedColor;
      }
      if (d.isHovered) {
        return hoveredColor;
      }
      return d.color.border;
    })
    .attr("stroke-width", (d) => {
      if (d.isSelected) {
        return 8;
      }
      if (d.isHovered) {
        return 8;
      }
      return 2;
    })
    .on("mouseover", function (d, i) {
      console.log("mouse over");
      if (get(isDrawingSignalLine)) {
        get(signalLineClass).setDestinationSnapPointIndex(d);
      }
      d.stopPropagation();
      let obj = d.path[0].__data__;
      d3.select(this).attr("fill", hoveredColor);
      // .attr("stroke-width", obj.lineWidth * 4);
    })
    .on("mouseout", function (d, i) {
      d.stopPropagation();
      let obj = d.path[0].__data__;
      d3.select(this).attr("fill", obj.color.background);
      // .attr("stroke-width", obj.lineWidth);
    })

    .on("mousedown", function (d, i) {
      d.stopPropagation();
      if (!get(isDrawMode)) return;
      // get(svgRef)
      //   .append("line")
      //   .attr("id", "temp-signal-line")
      //   .attr("stroke", "black")
      //   .attr("stroke-width", 10)
      //   .raise();
      signalLineClass.setOriginSnapPointIndex(d);
      setIsDrawingSignalLine(true);
      // temporarySignalLine
      //   .attr("x1", this.cx.animVal.value)
      //   .attr("y1", this.cy.animVal.value);
    })
    .on("mouseup", (d) => {
      d.stopPropagation();
      // setIsDrawingSignalLine(false);
      if (get(isDrawMode) && get(isDrawingSignalLine)) {
        signalLineClass.addSignalLine();
        setIsDrawingSignalLine(false);
      }
    })
    .on("click", (e) => {
      e.stopPropagation();
      if (!get(isDrawMode)) {
        snapPointClass.selectSnapPoint(e);
      }
      // if (get(isDrawMode)) {
      //   return console.log("begin drawing");
      // }
    });

  lineGroupElements = get(svgRef)
    .selectAll("g")
    .data(signalLineClass.array)
    .enter()
    .append("g")
    .attr("id", (d) => "line-group" + d.i);

  // Draw Dragging Signal Line
  // Draw Dragging Signal Line
  // Draw Dragging Signal Line

  // TODO: create a function to get the origin without relying on the
  // signal line clas  array
  // if (get(isDrawingSignalLine)) {
  //   get(svgRef)
  //     .append("line")
  //     .attr("x1", (d, i) => {
  //       return get(mouseCoordinates).origin.x;
  //     })
  //     .attr("y1", (d, i) => get(mouseCoordinates).origin.y)
  //     .attr("x2", (d, i) => get(mouseCoordinates).end.x)
  //     .attr("y2", (d, i) => get(mouseCoordinates).end.y)
  //     .attr("stroke-width", 4)
  //     .attr("stroke", "#000");
  // }

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
    .attr(
      "x2",
      (d, i) => signalLineClass.getOriginCoordinates(d, i, "destination").x
    )
    .attr(
      "y2",
      (d, i) => signalLineClass.getOriginCoordinates(d, i, "destination").y
    )
    .attr("stroke", (d) => {
      if (d.isSelected) {
        console.log("is selected");
        return "red";
      } else {
        console.log("is not selected");
        return "none";
      }
    })
    .attr("stroke-width", (d) => d.lineWidth * 4)
    .attr("pointer-events", "visible")
    .on("mouseover", (e, d) => {
      e.stopPropagation();
      get(isSelectMode) &&
        !get(isDrawingSignalLine) &&
        d3.select(e.path[0]).attr("stroke", hoveredColor);
    })
    .on("mouseout", (e) => {
      e.stopPropagation();
      get(isSelectMode) &&
        !get(isDrawingSignalLine) &&
        d3.select(e.path[0]).attr("stroke", "none");
    })
    .on("click", (e) => {
      let i = e.path[0].__data__.i;
      get(isSelectMode) &&
        !get(isDrawingSignalLine) &&
        signalLineClass.selectSignalLine(i);
    });
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
    .attr(
      "x2",
      (d, i) => signalLineClass.getOriginCoordinates(d, i, "destination").x
    )
    .attr(
      "y2",
      (d, i) => signalLineClass.getOriginCoordinates(d, i, "destination").y
    )
    .attr("stroke", (d) => {
      if (d.isSelected) {
        // return selectedColor;
        return d.color.background;
      } else {
        return d.color.background;
      }
    })
    .attr("stroke-width", (d) => d.lineWidth * 2)
    .attr("pointer-events", "none");

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
      return screenWidth / 11 + "px";
    })
    .style("opacity", 0.25)
    .attr("text-anchor", "middle")
    .attr("font-famliy", "'Heebo', sans-serif;")
    .style("pointer-events", "none")
    .style("user-select", "none")
    .style("font-weight", "800")
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

  // Draw Temporary Signal Line
  let temporarySignalLine = get(svgRef)
    .append("line")
    .attr("id", "temp-signal-line")
    .attr("stroke", "black")
    .attr("stroke-width", 10)
    .raise();

  snapPointGroupElement.raise();
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
    .attr("y", ((p.height / 12) * get(width)) / get(height))
    .attr("x", p.width / 32)
    .attr("dominant-baseline", "central")
    .style("font-size", p.width / 6 + "px")
    .style("pointer-events", "none")
    .style("user-select", "none");
};
