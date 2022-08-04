<script>
  import {
    canvasWrapperHeight,
    canvasWrapperWidth,
    gZoomWrapperRef,
    topLevelSvgRef,
  } from "../store";

  import * as d3 from "d3";

  import { handleKeyUp, handleKeyDown } from "../functions/events/keys";

  import { onMount } from "svelte";

  const createSvg = () => {
    $topLevelSvgRef = d3
      .select("#canvas")
      .append("svg")
      .attr("id", "svg")
      .attr("width", $canvasWrapperWidth)
      .attr("height", $canvasWrapperHeight);

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
