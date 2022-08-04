<script>
  import { canvasWrapperHeight, canvasWrapperWidth, svgRef } from "../store";

  import { handleKeyUp, handleKeyDown } from "../functions/events/keys";

  import { onMount } from "svelte";

  const createSvg = () => {
    $svgRef.topLevelSvg = d3
      .select("#canvas")
      .append("svg")
      .attr("id", "svg")
      .attr("width", $canvasWrapperWidth)
      .attr("height", $canvasWrapperHeight);

    $svgRef.gZoomWrapper = $svgRef.topLevelSvg
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
