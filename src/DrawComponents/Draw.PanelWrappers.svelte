<script lang="ts">
  import {
    isDrawingSignalLine,
    gZoomWrapperRef,
    isDrawMode,
    isSelectMode,
    groups,
    groupsEnter,
    setIsDrawingSignalLine,
    mousePosition,
    screens,
    currentScreenIndex,
  } from "../store";

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";

  import * as d3 from "d3";

  $: {
    let t = [$isDrawMode, $isDrawingSignalLine, $currentScreenIndex, $screens];

    drawPanelWrappers();
  }

  const drawPanelWrappers = () => {
    if (typeof $currentScreenIndex != "number") {
      return;
    }

    let panels = $screens[$currentScreenIndex].panels.array;

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
      .attr("id", (d) => "panelgroup" + d.i)
      .attr("transform", (d) => {
        return (
          "translate(" + d.getDimensions().x + "," + d.getDimensions().y + ")"
        );
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
        drawPanelWrappers();
      })
      .on("mousemove", function (d) {
        if (!$isDrawMode) return;
        $screens[
          $currentScreenIndex
        ].signalLines.nullDestinationSnapPointIndex();
        $mousePosition.x = d.x;
        $mousePosition.y = d.y;
      })
      .on("mouseup", function () {
        $screens[
          $currentScreenIndex
        ].signalLines.nullDestinationSnapPointIndex();
        $mousePosition.x = 0;
        $mousePosition.y = 0;

        d3.select("#temp-signal-line")
          .attr("x1", null)
          .attr("y1", null)
          .attr("x2", null)
          .attr("y2", null);

        setIsDrawingSignalLine(false);
      })
      .on("click", function (e, i) {
        if ($isDrawMode) return;
        e.stopPropagation();
        if ($isSelectMode && !$isDrawingSignalLine) {
          $screens[$currentScreenIndex].panels.togglePanels([
            e.target.__data__.i,
          ]);
          $screens = $screens;
        }
      });

    // Draw Coordinates
    // Draw Coordinates
    // Draw Coordinates
    $groupsEnter
      .append("text")
      .merge($groups.select("text"))
      .text((d) => d.getCoordinateText())
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
      .attr("x", (d) => d.lineWidth + d.lineWidth / 2)
      .attr("y", (d) => d.lineWidth + d.lineWidth / 2)
      .attr("width", (d) => d.width - d.lineWidth * 2)
      .attr("height", (d) => d.height - d.lineWidth * 2)
      .attr("stroke", selectedColor)
      .attr("stroke-width", (d) => d.lineWidth * 2);

    rects
      .filter((d) => {
        return d.isHidden;
      })
      .attr("fill", "transparent")
      .attr("stroke", "transparent");
  };
</script>
