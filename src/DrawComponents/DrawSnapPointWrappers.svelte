<script>
  import {
    signalLines as signalLinesClass,
    snapPoints as snapPointsClass,
    panels as panelsClass,
    svgRef,
    isDrawingSignalLine,
    gZoomWrapperRef,
    panelWrappersRef,
    mode,
    topLevelSvgRef,
    isDrawMode,
    isSelectMode,
    groups,
    groupsEnter,
    isRearView,
    columns,
    rows,
  } from "../store";

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";

  import * as d3 from "d3";

  $: {
    let t = [$panelsClass, $isRearView];
    console.log("triggered");

    $groups && drawSnapPointWrappers();
  }

  let panel = {
    i: 59,
    thisPanelsSnapPoints: [118, 119],
    colorIndex: 1,
    isSelected: false,
    isHovered: false,
    color: {
      background: "#fff",
      border: "#000",
      font: "#000",
    },
    lineWidth: 2.428717948717949,
    scale: 1,
    x: 1105.0666666666666,
    y: 473.6,
    width: 78.93333333333334,
    height: 157.86666666666667,
    row: 3,
    column: 14,
    panelDimension: 157.86666666666667,
    leftPadding: 0,
    topPadding: 0,
    ratio: 0.5,
  };

  const drawSnapPointWrappers = () => {
    let snapPoints = $snapPointsClass.array;

    snapPoints.forEach((sp, i) => {
      // console.log(sp);
      $groupsEnter
        .filter((d) => {
          // console.log(d);
          return d.i === sp.panelIndex;
        })
        .append("g")
        .merge($groups.select("g"))
        .attr("id", (d) => {
          return "snap-point-group" + i;
        })
        .attr("transform", (d) => {
          return "translate(" + sp.x + "," + sp.y + ")";
        })
        .append("circle")
        .attr("r", 5);
    });
  };

  //   $groups = $gZoomWrapperRef.selectAll("g").data(panels, (d) => d.i);

  //   $groupsEnter = $groups.enter().append("g");

  //   $groupsEnter
  //     .merge($groups)
  //     .transition()
  //     .attr("id", (d) => "panel-group" + d.i)
  //     .attr("transform", (d) => {
  //       return "translate(" + d.x + "," + d.y + ")";
  //     });

  //   $groups.exit().remove();

  //   let rects = $groupsEnter
  //     .append("rect")
  //     .merge($groups.select("rect"))
  //     .attr("class", "panel-wrapper")
  //     .attr("id", (d) => {
  //       "panel-rectangle" + d.i;
  //     })
  //     .attr("x", 0)
  //     .attr("y", 0)
  //     .attr("width", (d) => d.width)
  //     .attr("height", (d) => d.height)
  //     .attr("fill", (d) => d.color.background)
  //     .attr("stroke", (d) => d.color.border)
  //     .attr("stroke-width", (d) => d.lineWidth)
  //     .style("point-events", $isDrawingSignalLine && "none")
  //     .on("mouseover", function (d, i) {
  //       if ($isDrawMode) {
  //         return;
  //       }
  //       d3.select(this).attr("fill", hoveredColor);
  //     })
  //     .on("mouseout", function (d, i) {
  //       if ($isDrawMode) return;
  //       let obj = d.path[0].__data__;
  //       d3.select(this).attr("fill", obj.color.background);
  //     })
  //     .on("mousemove", function (d) {
  //       if (!$isDrawMode) return;
  //       $signalLinesClass.nullDestinationSnapPointIndex();
  //       $signalLinesClass.setMousePosition(d);
  //     })
  //     .on("mouseup", function (d) {
  //       $signalLinesClass.nullDestinationSnapPointIndex();
  //       $signalLinesClass.nullDestinationSnapPointIndex();
  //       $signalLinesClass.setMousePosition({ x: 0, y: 0 });

  //       d3.select("#temp-signal-line")
  //         .attr("x1", null)
  //         .attr("y1", null)
  //         .attr("x2", null)
  //         .attr("y2", null);

  //       // setIsDrawingSignalLine(false);
  //     })
  //     .on("click", function (d, i, n) {
  //       if ($isDrawMode) return;
  //       d.stopPropagation();
  //       $isSelectMode && !$isDrawingSignalLine && $panelsClass.selectPanel(d);
  //     });

  //   // Draw Coordinates
  //   // Draw Coordinates
  //   // Draw Coordinates
  //   $groupsEnter
  //     .append("text")
  //     .merge($groups.select("text"))
  //     .text((d) => {
  //       if ($isRearView) {
  //         return $columns - d.column + "," + (d.row + 1);
  //       } else {
  //         return d.column + 1 + "," + (d.row + 1);
  //       }
  //     })
  //     .attr("x", (d) => d.width / 32)
  //     .attr("y", (d) => d.height / 32)
  //     .attr("dominant-baseline", "hanging")
  //     .style("font-size", (d) => d.width / 6 + "px")
  //     .style("pointer-events", "none")
  //     .style("user-select", "none");

  //   // Draw Snap Points Groups
  //   // Draw Snap Points Groups
  //   // Draw Snap Points Groups

  //   // $groupsEnter
  //   //   .append("text")
  //   //   .merge($groups.select("text"))
  //   //   .text((d) => {
  //   //     if ($isRearView) {
  //   //       return $columns - d.column + "," + (d.row + 1);
  //   //     } else {
  //   //       return d.column + 1 + "," + (d.row + 1);
  //   //     }
  //   //   })
  //   //   .attr("x", (d) => d.width / 32)
  //   //   .attr("y", (d) => d.height / 32)
  //   //   .attr("dominant-baseline", "hanging")
  //   //   .style("font-size", (d) => d.width / 6 + "px")
  //   //   .style("pointer-events", "none")
  //   //   .style("user-select", "none");

  //   // Draw Selected Panels
  //   // Draw Selected Panels
  //   // Draw Selected Panelss
  //   rects
  //     .filter(function (d) {
  //       return d.isSelected;
  //     })
  //     .attr("x", (d) => d.lineWidth)
  //     .attr("y", (d) => d.lineWidth)
  //     .attr("width", (d) => {
  //       return d.width - d.lineWidth * 2;
  //     })
  //     .attr("height", (d) => d.height - d.lineWidth * 2)
  //     .attr("stroke", selectedColor)
  //     .attr("stroke-width", (d) => d.lineWidth * 2);
  // };
</script>
