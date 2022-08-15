<script>
  import {
    canvasWrapperHeight,
    canvasWrapperWidth,
    gZoomWrapperRef,
    topLevelSvgRef,
    panels,
    signalLines,
    snapPoints,
  } from "../store";

  import * as d3 from "d3";

  import { handleKeyUp, handleKeyDown } from "../functions/events/keys";

  import { onMount } from "svelte";

  const deSelectAll = () => {
    // console.log("DESELECT");
    // $panels.deSelect();
    // $signalLines.deSelect();
    // $snapPoints.deSelect();
    // $panels = $panels;
  };

  const createSvg = () => {
    $topLevelSvgRef = d3
      .select("#canvas")
      .append("svg")
      .attr("id", "svg")
      .attr("width", $canvasWrapperWidth)
      .attr("height", $canvasWrapperHeight)
      .on("click", deSelectAll);

    $gZoomWrapperRef = $topLevelSvgRef
      .append("g")
      .attr("width", $canvasWrapperWidth)
      .attr("height", $canvasWrapperHeight)
      .attr("id", "g-zoom-wrapper");
  };

  d3.select("body").on("keydown", handleKeyDown).on("keyup", handleKeyUp);

  onMount(() => {
    createSvg();
  });
</script>
