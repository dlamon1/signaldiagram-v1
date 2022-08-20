<script>
  import {
    canvasWrapperHeight,
    canvasWrapperWidth,
    gZoomWrapperRef,
    topLevelSvgRef,
    panels,
    signalLines,
    snapPoints,
    setIsDrawingSignalLine,
  } from "../store";

  import * as d3 from "d3";

  import { handleKeyUp, handleKeyDown } from "../functions/events/keys";

  import { onMount } from "svelte";

  const deSelectAll = (e) => {
    // console.log("DESELECT");
    // console.log(e);
    $panels.deSelect();
    $signalLines.deSelect();
    $snapPoints.deSelect();
    $panels = $panels;
  };

  const createSvg = () => {
    $topLevelSvgRef = d3
      .select("#canvas")
      .append("svg")
      .attr("id", "svg")
      .attr("id", "svg")
      .attr("class", "top-level-svg")
      .attr("width", $canvasWrapperWidth)
      .attr("width", $canvasWrapperWidth)
      .attr("height", $canvasWrapperHeight)
      .on("mouseup", () => {
        setIsDrawingSignalLine(false);
      });
    // .on("click", deSelectAll);

    $gZoomWrapperRef = $topLevelSvgRef
      .append("g")
      .attr("width", $canvasWrapperWidth)
      .attr("height", $canvasWrapperHeight)
      .attr("id", "g-zoom-wrapper")
      .attr("class", "g-zoom-wrapper");
    // .on("click", (d) => d.stopPropagation());
  };

  d3.select("body").on("keydown", handleKeyDown).on("keyup", handleKeyUp);

  onMount(() => {
    createSvg();
  });
</script>
