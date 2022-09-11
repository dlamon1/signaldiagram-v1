<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import {
    topLevelSvgRef,
    canvasWrapperHeight,
    canvasWrapperWidth,
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

  $: {
    $topLevelSvgRef && initZoom();
  }

  let zoom = d3
    .zoom()
    .scaleExtent([0.25, $canvasWrapperHeight / $width])
    // .translateExtent([
    //   [-$width * $columns, -$rows * $height * 0.95],
    //   [$width * $columns * 2, $rows * $height * 1.95],
    // ])
    .on("zoom", handleZoom);

  const centerScreen = () => {
    let k = ($canvasWrapperWidth / $columns / $width) * 0.85;
    if ($canvasWrapperHeight < $rows * $height * k) {
      k = ($canvasWrapperHeight / $rows / $height) * 0.85;
    }
    let x = $canvasWrapperWidth - $columns * $width * k;
    let y = $canvasWrapperHeight - $rows * $height * k;

    d3.select("svg").call(
      zoom.transform as any,
      d3.zoomIdentity.scale(k).translate(x, y)
    );
  };

  function handleZoom(e) {
    $transformStore = e.transform;
    d3.select("g.g-zoom-wrapper").attr("transform", e.transform);
  }

  function initZoom() {
    d3.select("svg").call(zoom);
  }
</script>
