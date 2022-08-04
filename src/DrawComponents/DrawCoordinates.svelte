<script>
  import { onMount } from "svelte";

  import * as d3 from "d3";

  import {
    signalLines as signalLinesClass,
    snapPoints as snapPointsClass,
    panels as panelsClass,
    panelWrappersRef,
    isSelectMode,
    isDrawMode,
    setIsDrawingSignalLine,
    isDrawingSignalLine,
    selectedPanelRectsRef,
    snapPointsWrapper,
    snapPointBaseCircles,
    selectedSnapPointCirclesRef,
    coordinatesRef,
    screenAndPanelDimensions,
    width,
    height,
  } from "../store";

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";

  $: {
    console.log("triggered");

    // $snapPointsWrapper && drawSnapPointObjects();
    $snapPointsWrapper && asdf();
  }

  const asdf = () => {
    let panels = $panelsClass.array;

    let w = ($screenAndPanelDimensions.panelDimension * $width) / $height;
    let h = $screenAndPanelDimensions.panelDimension;

    $coordinatesRef = $panelWrappersRef
      .selectAll("text")
      .data(function (d, i, n) {
        let data = [];
        panels.forEach((p) => {
          if (p.i == d.i) {
            data.push(p);
          }
        });
        return data;
      })
      .enter()
      .append("text")
      .text((d) => d.column + "," + d.row)
      .attr("y", h / 16)
      .attr("x", w / 32)
      .attr("dominant-baseline", "central")
      .style("font-size", $screenAndPanelDimensions.panelDimension / 10 + "px")
      .style("pointer-events", "none")
      .style("user-select", "none");
  };
</script>
