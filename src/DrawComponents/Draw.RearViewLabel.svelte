<script>
  import {
    signalLines as signalLinesClass,
    snapPoints as snapPointsClass,
    panels as panelsClass,
    gZoomWrapperRef,
    isRearView,
    columns,
    rows,
    width,
    height,
    opacity,
  } from "../store";

  $: {
    let t = [$isRearView, $opacity, $panelsClass];

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
      .attr("x", ($columns * $width) / 2)
      .attr("y", ($rows * $height) / 2)
      .attr("fill", "#000")
      .attr("font-size", () => {
        let screenWidth = $columns * $width;
        return screenWidth / 7 + "px";
      })
      .style("opacity", $opacity)
      .attr("text-anchor", "middle")
      .style("pointer-events", "none")
      .style("user-select", "none")
      .style("font-weight", "800")
      .style("font-family", "BlinkMacSystemFont")
      .attr("dominant-baseline", "middle")
      .attr(
        "transform-origin",
        ($columns * $width) / 2 + " " + ($rows * $height) / 2
      );
    // .attr("transform", () => {
    //   let opposite = $columns * $width;
    //   let adjacent = $rows * $height;
    //   let angle = Math.atan(adjacent / opposite);
    //   angle = ((-angle * 180) / Math.PI) * 0.4;
    //   return "rotate(" + angle + ")";
    // });
  };
</script>
