<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import {
    topLevelSvgRef,
    canvasWrapperHeight,
    canvasWrapperWidth,
    transform as transformStore,
    currentScreenIndex,
    screens,
  } from "../store";

  $: {
    let t = [$currentScreenIndex];

    centerScreen();
  }

  $: {
    $topLevelSvgRef && initZoom();
  }

  let zoom = d3
    .zoom()
    .scaleExtent([
      0.1,
      $canvasWrapperHeight / $screens[$currentScreenIndex].width,
    ])
    // .translateExtent([
    //   [-$width * $columns, -$rows * $height * 0.95],
    //   [$width * $columns * 2, $rows * $height * 1.95],
    // ])
    .on("zoom", handleZoom);

  const centerScreen = () => {
    let k =
      $canvasWrapperWidth /
      $screens[$currentScreenIndex].columns /
      $screens[$currentScreenIndex].width;
    if (
      $canvasWrapperHeight <
      $screens[$currentScreenIndex].rows *
        $screens[$currentScreenIndex].height *
        k
    ) {
      k =
        $canvasWrapperHeight /
        $screens[$currentScreenIndex].rows /
        $screens[$currentScreenIndex].height;
    }

    let x =
      $canvasWrapperWidth -
      $screens[$currentScreenIndex].columns *
        $screens[$currentScreenIndex].width *
        k;

    let y =
      $canvasWrapperHeight -
      $screens[$currentScreenIndex].rows *
        $screens[$currentScreenIndex].height *
        k;

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
