<script lang="ts">
  import {
    signalLines as signalLinesClass,
    snapPoints as snapPointsClass,
    panels as panelsClass,
    isDrawingSignalLine,
    gZoomWrapperRef,
    isDrawMode,
    isSelectMode,
    groups,
    groupsEnter,
    isRearView,
    columns,
    setIsDrawingSignalLine,
    showCoordinates,
    showDirectionArrows,
  } from "../store";

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";

  import * as d3 from "d3";

  $: {
    // console.log("triggered");
    let t = [
      $panelsClass,
      $isRearView,
      $isDrawMode,
      $snapPointsClass,
      $showCoordinates,
      $isDrawingSignalLine,
      $showDirectionArrows,
    ];

    drawPanelWrappers();
  }

  const drawPanelWrappers = () => {
    console.log("draw panels");
    let panels = $panelsClass.array;

    d3.select("#temp-signal-line").remove();

    // 1
    $groups = $gZoomWrapperRef
      .selectAll("g.panel-wrapper")
      .data(panels, (d) => d.i);

    // 2
    $groupsEnter = $groups.enter().append("g").classed("panel-wrapper", true);

    // 3
    $groupsEnter
      .merge($groups)
      .transition()
      .attr("id", (d) => "panelgroup" + d.i)
      .attr("transform", (d) => {
        return "translate(" + d.x + "," + d.y + ")";
      });

    // 4
    $groups.exit().remove();

    //5
    let rects = $groupsEnter
      .append("rect")
      .merge($groups.select("rect"))
      .attr("x", (d) => d.lineWidth * d.lineWidthMultiplier)
      .attr("y", (d) => d.lineWidth * d.lineWidthMultiplier)
      .attr("width", (d) => d.width - d.lineWidth * d.lineWidthMultiplier)
      .attr("height", (d) => d.height - d.lineWidth * d.lineWidthMultiplier)
      .attr("fill", (d) => d.color.background)
      .attr("stroke", (d) => d.color.border)
      .attr("stroke-width", (d) => d.lineWidth * d.lineWidthMultiplier)
      .style("point-events", $isDrawingSignalLine && "none")
      .on("mouseover", function (d, i) {
        if ($isDrawMode) {
          return;
        }
        d3.select(this).attr("fill", hoveredColor);
      })
      .on("mouseout", function (d, i) {
        if ($isDrawMode) return;
        let obj = d.path[0].__data__;
        d3.select(this).attr("fill", obj.color.background);
      })
      .on("mousemove", function (d) {
        if (!$isDrawMode) return;
        $signalLinesClass.nullDestinationSnapPointIndex();
        $signalLinesClass.setMousePosition(d);
      })
      .on("mouseup", function (d) {
        $signalLinesClass.nullDestinationSnapPointIndex();
        $signalLinesClass.nullDestinationSnapPointIndex();
        $signalLinesClass.setMousePosition({ x: 0, y: 0 });

        d3.select("#temp-signal-line")
          .attr("x1", null)
          .attr("y1", null)
          .attr("x2", null)
          .attr("y2", null);

        setIsDrawingSignalLine(false);
      })
      .on("click", (e) => {
        if ($isDrawMode) return;
        e.stopPropagation();
        if ($isSelectMode && !$isDrawingSignalLine) {
          $panelsClass.selectPanels([e.target.__data__.i]);
        }
      });

    // Draw Coordinates
    // Draw Coordinates
    // Draw Coordinates
    $groupsEnter
      .append("text")
      .merge($groups.select("text"))
      .text((d) => {
        if (!$showCoordinates) {
          return "";
        }
        if ($isRearView) {
          return $columns - d.column + "," + (d.row + 1);
        } else {
          return d.column + 1 + "," + (d.row + 1);
        }
      })
      .attr("x", (d) => d.width / 32)
      .attr("y", (d) => d.height / 32)
      .attr("dominant-baseline", "hanging")
      .style("font-size", (d) => d.width / 6 + "px")
      .attr("fill", (d) => d.color.font)
      .style("pointer-events", "none")
      .style("user-select", "none")
      .style("font-family", "Heebo");

    // Draw Selected Panels
    // Draw Selected Panels
    // Draw Selected Panels
    rects
      .filter(function (d) {
        return d.isSelected;
      })
      .attr("x", (d) => d.lineWidth)
      .attr("y", (d) => d.lineWidth)
      .attr("width", (d) => d.width - d.lineWidth * 2)
      .attr("height", (d) => d.height - d.lineWidth * 2)
      .attr("stroke", selectedColor)
      .attr("stroke-width", (d) => d.lineWidth * 2);
  };
</script>
