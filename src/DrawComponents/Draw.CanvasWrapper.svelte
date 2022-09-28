<script lang="ts">
  import {
    canvasWrapperHeight,
    canvasWrapperWidth,
    gZoomWrapperRef,
    topLevelSvgRef,
    setIsDrawingSignalLine,
    isShifted,
    screens,
    currentScreenIndex,
  } from "../store";

  import * as d3 from "d3";

  import { handleKeyUp, handleKeyDown } from "../functions/events/keys";

  import { onMount } from "svelte";

  const deSelectAll = (e) => {
    if ($isShifted) return;
    $screens.forEach((screen) => {
      screen.panels.deSelect();
      screen.signalLines.deSelect();
      screen.snapPoints.deSelect();
    });
  };

  const createSvg = () => {
    $topLevelSvgRef = d3
      .select("#canvas")
      .append("svg")
      .attr("id", "svg")
      .attr("id", "svg")
      .attr("class", "top-level-svg")
      .attr("width", $canvasWrapperWidth)
      .attr("height", $canvasWrapperHeight)
      .on("mouseup", () => {
        setIsDrawingSignalLine(false);
      })
      .on("click", deSelectAll);

    $gZoomWrapperRef = $topLevelSvgRef
      .append("g")
      // .attr(
      //   "width",
      //   $screens[$currentScreenIndex].width *
      //     $screens[$currentScreenIndex].columns
      // )
      // .attr(
      //   "height",
      //   $screens[$currentScreenIndex].height *
      //     $screens[$currentScreenIndex].rows
      // )
      .attr("id", "g-zoom-wrapper")
      .attr("class", "g-zoom-wrapper");
  };

  d3.select("body").on("keydown", handleKeyDown).on("keyup", handleKeyUp);

  onMount(() => {
    createSvg();
  });
</script>
