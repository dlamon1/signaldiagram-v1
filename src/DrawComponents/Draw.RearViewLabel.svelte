<script lang="ts">
  import {
    gZoomWrapperRef,
    isRearView,
    opacity,
    snapPointsGroupEnterRef,
    screens,
    currentScreenIndex,
  } from "../store";

  $: {
    let t = [$opacity, $screens];

    drawRearViewLabel();
  }

  import * as d3 from "d3";

  let rearViewLabel = null;

  const drawRearViewLabel = () => {
    const screen = $screens[$currentScreenIndex];
    if (rearViewLabel) {
      d3.select("#rear-view-label").text("").remove();
    }

    if (!screen.isRearView) return;

    rearViewLabel = $gZoomWrapperRef
      .append("text")
      .attr("id", "rear-view-label")
      .text(() => ($screens[$currentScreenIndex].isRearView ? "REAR VIEW" : ""))
      .attr("x", (screen.columns * screen.width) / 2)
      .attr("y", (screen.rows * screen.height) / 2)
      .attr("fill", "#000")
      .attr("font-size", () => {
        let screenWidth = screen.columns * screen.width;
        return screenWidth / 7 + "px";
      })
      .style("opacity", $opacity)
      .attr("text-anchor", "middle")
      .style("pointer-events", "none")
      .style("user-select", "none")
      .style("font-weight", "800")
      .style("font-family", "Heebo")
      .attr("dominant-baseline", "middle")
      .attr(
        "transform-origin",
        (screen.columns * screen.width) / 2 +
          " " +
          (screen.rows * screen.height) / 2
      );
    // .attr("transform", () => {
    //   let opposite = $columns * screen.width;
    //   let adjacent = $rows * screen.height;
    //   let angle = Math.atan(adjacent / opposite);
    //   angle = ((-angle * 180) / Math.PI) * 0.4;
    //   return "rotate(" + angle + ")";
    // });

    if ($snapPointsGroupEnterRef) {
      d3.selectAll("g.snap-point-wrapper").raise();
    }
  };
</script>
