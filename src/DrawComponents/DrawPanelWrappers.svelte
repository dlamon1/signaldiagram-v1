<script>
  import { onMount } from "svelte";

  import {
    signalLines as signalLinesClass,
    snapPoints as snapPointsClass,
    panels as panelsClass,
    svgRef,
    isDrawingSignalLine,
    gZoomWrapperRef,
    panelWrappersRef,
    mode,
  } from "../store";

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";

  $: {
    let t = [$panelsClass, $mode];

    console.log("CanvasDraw tigger");
    // console.log($panelsClass.array);

    $gZoomWrapperRef && initPanelGroups();
  }

  export const initPanelGroups = () => {
    console.log("triggered");

    let panels = $panelsClass.array;

    $gZoomWrapperRef.selectAll("*").remove();

    // Draw a G for each Panel
    // Draw a G for each Panel
    // Draw a G for each Panel
    $panelWrappersRef = $gZoomWrapperRef
      .selectAll("svg")
      .data(panels)
      .enter()
      .append("svg")
      .attr("id", (d) => "panel-group" + d.i)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .style("point-events", $isDrawingSignalLine && "none");
  };
</script>
