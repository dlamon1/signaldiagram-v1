<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import {
    isDrawMode,
    topLevelSvgRef,
    canvasWrapperHeight,
    canvasWrapperWidth,
    isSelectMode,
    screenAndPanelDimensions,
    transform as transformStore,
    columns,
    rows,
    width,
    height,
  } from "../store";

  let zoom = d3
    .zoom()
    .scaleExtent([
      0.25,
      $canvasWrapperHeight / $screenAndPanelDimensions.panelDimension,
    ])
    // .translateExtent([
    //   [0, 0],
    //   [$canvasWrapperWidth, $canvasWrapperHeight],
    // ])
    .on("zoom", handleZoom);

  $: {
    let t = [$columns, $rows, $width, $height];

    centerScreen();
  }

  const centerScreen = () => {
    let k = $canvasWrapperWidth / $columns / $width;
    let x = $canvasWrapperWidth - $columns * $width * k;
    let y = $canvasWrapperHeight - $rows * $height * k;

    d3.select("svg")
      .transition()
      .duration(500)
      .call(zoom.transform, d3.zoomIdentity.scale(k).translate(x, y));
    console.log(d3.zoomIdentity.applyX(100));
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
