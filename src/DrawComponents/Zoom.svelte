<script>
  import * as d3 from "d3";

  import {
    isDrawMode,
    topLevelSvgRef,
    canvasWrapperHeight,
    isSelectMode,
    screenAndPanelDimensions,
    transform as transformStore,
  } from "../store";

  let zoom = d3
    .zoom()
    .scaleExtent([
      0.5,
      $canvasWrapperHeight / $screenAndPanelDimensions.panelDimension,
    ])
    // .translateExtent([
    //   [0, 0],
    //   [$canvasWrapperWidth, $canvasWrapperHeight],
    // ])
    .on("zoom", handleZoom);

  function handleZoom(e) {
    $transformStore = e.transform;
    d3.select("svg g").attr("transform", e.transform);
  }

  function initZoom() {
    d3.select("svg").call(zoom);
  }

  function removeZoom() {
    d3.select("svg").on(".zoom", null);
  }

  const addOnHoverIdTag = () => {
    d3.select("svg").selectAll("g").attr("id", "g-onhover");
  };

  $: {
    // this svgfRef is required because the ref doesn't exist
    // when this is initialized

    let t = $topLevelSvgRef;

    if ($isDrawMode) {
      addOnHoverIdTag();
      removeZoom();
    }
    if ($isSelectMode) {
      $topLevelSvgRef && initZoom();
    }
  }
</script>
