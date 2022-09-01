<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import {
    isDrawMode,
    topLevelSvgRef,
    canvasWrapperHeight,
    canvasWrapperWidth,
    isSelectMode,
    transform as transformStore,
    columns,
    rows,
    width,
    height,
  } from "../store";

  $: {
    let t = [$columns, $rows, $width, $height];

    centerScreen();
  }

  let zoom = d3
    .zoom()
    .scaleExtent([0.25, $canvasWrapperHeight / $width])
    // .translateExtent([
    //   [-100, -100],
    //   [$canvasWrapperWidth, $canvasWrapperHeight],
    // ])
    .on("zoom", handleZoom);

  const centerScreen = () => {
    let k = ($canvasWrapperWidth / $columns / $width) * 0.85;
    if ($canvasWrapperHeight < $rows * $height * k) {
      k = ($canvasWrapperHeight / $rows / $height) * 0.85;
    }
    let x = $canvasWrapperWidth - $columns * $width * k;
    let y = $canvasWrapperHeight - $rows * $height * k;

    d3.select("svg")
      .transition()
      .duration(500)
      .call(zoom.transform as any, d3.zoomIdentity.scale(k).translate(x, y));
  };

  function handleZoom(e) {
    $transformStore = e.transform;
    d3.select("g.g-zoom-wrapper").attr("transform", e.transform);
  }

  function initZoom() {
    d3.select("svg").call(zoom);
  }

  // function removeZoom() {
  //   d3.select("svg").on(".zoom", null);
  // }

  // const addOnHoverIdTag = () => {
  //   d3.select("svg").selectAll("g").attr("id", "g-onhover");
  // };

  $: {
    $topLevelSvgRef && initZoom();
  }
</script>
