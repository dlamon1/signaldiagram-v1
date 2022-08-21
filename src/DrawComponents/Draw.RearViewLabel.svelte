<script>
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
    rows,
    setIsDrawingSignalLine,
    showCoordinates,
    screenAndPanelDimensions,
    width,
    height,
    opacity,
    transform,
    directionArrowQuantity,
    showDirectionArrows,
  } from "../store";

  $: {
    let t = [$isRearView, $opacity];

    drawRearViewLabel();
  }

  import * as d3 from "d3";

  let rearViewLabel = null;

  const drawRearViewLabel = () => {
    if (rearViewLabel) {
      d3.select("#rear-view-label").text("").remove();
    }
    rearViewLabel = $gZoomWrapperRef
      .append("text")
      .attr("id", "rear-view-label")
      .text(() => ($isRearView ? "REAR VIEW" : ""))
      .attr(
        "x",
        (($columns + 1) * $screenAndPanelDimensions.panelDimension * $width) /
          $height /
          2
      )
      .attr("y", ($rows * $screenAndPanelDimensions.panelDimension) / 2)
      .attr("fill", "#000")
      .attr("font-size", () => {
        let screenWidth = $columns * $screenAndPanelDimensions.panelDimension;
        return screenWidth / 11 + "px";
      })
      .style("opacity", $opacity)
      .attr("text-anchor", "middle")
      .attr("font-famliy", "'Heebo', sans-serif;")
      .style("pointer-events", "none")
      .style("user-select", "none")
      .style("font-weight", "800")
      .attr("dominant-baseline", "middle")
      .attr("transform-origin", "50% 50%")
      .attr("transform", () => {
        let opposite = $columns * $screenAndPanelDimensions.panelDimension;
        let adjacent = $rows * $screenAndPanelDimensions.panelDimension;
        // let opposite =
        //   ($columns * $screenAndPanelDimensions.panelDimension * $width) /
        //     $height -
        //   150;
        // let adjacent = $rows * $screenAndPanelDimensions.panelDimension - 150;
        let angle = Math.atan(adjacent / opposite);
        angle = ((-angle * 180) / Math.PI) * 0.8;
        return "rotate(" + angle + ")";
      });
  };
</script>
