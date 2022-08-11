<script>
  import { canvasWrapperHeight, canvasWrapperWidth, svgRef } from "./store";
  import EventHandlers from "./EventHandlers.svelte";
  import EditToolbar from "./EditToolbar.svelte";
  import CanvasDraw from "./CanvasDraw.svelte";
  import Dialogs from "./Dialogs/index.svelte";
  import DrawPanelRects from "./DrawComponents/DrawPanelsRects.svelte";
  import DrawCanvasWrapper from "./DrawComponents/DrawCanvasWrapper.svelte";
  import DrawPanelWrappers from "./DrawComponents/DrawPanelWrappers.svelte";
  import Reactivity from "./Reactivity.svelte";
  import DrawSnapPointWrappers from "./DrawComponents/DrawSnapPointWrappers.svelte";
  import DrawSnapPointObjects from "./DrawComponents/DrawSnapPointObjects.svelte";
  import DrawCoordinates from "./DrawComponents/DrawCoordinates.svelte";
  import DrawTemporarySignalLine from "./DrawComponents/DrawTemporarySignalLine.svelte";
  import Zoom from "./DrawComponents/Zoom.svelte";

  import {
    topLevelSvgRef,
    gZoomWrapperRef,
    panelWrappersRef,
    selectedPanelRectsRef,
    snapPointsWrapper,
    snapPointBaseCircles,
    selectedSnapPointCirclesRef,
    coordinatesRef,
    temporarySignalLine,
    groupsEnter,
  } from "./store";

  // $: console.log($gZoomWrapperRef);

  $gZoomWrapperRef = null;
</script>

<div id="container">
  <Reactivity />
  <div
    id="canvas-wrapper"
    class="canvas-wrapper"
    bind:clientHeight={$canvasWrapperHeight}
    bind:clientWidth={$canvasWrapperWidth}
  >
    <div class="canvas" id="canvas">
      <EventHandlers />
    </div>
  </div>
  <div class="toolbar">
    <EditToolbar />
  </div>
  {#if $canvasWrapperWidth && $canvasWrapperHeight}
    <DrawCanvasWrapper />
  {/if}

  {#if $topLevelSvgRef}
    <Zoom />
  {/if}

  {#if $gZoomWrapperRef}
    <DrawPanelWrappers />
  {/if}

  <!-- {#if $panelWrappersRef}
    <DrawPanelRects />
  {/if} -->
  {#if $groupsEnter}
    <!-- <DrawSnapPointObjects /> -->
    <!-- <DrawSnapPointWrappers /> -->
  {/if}

  <!-- {#if $selectedPanelRectsRef} -->
  <!-- <DrawSnapPointObjects />
  <DrawCoordinates />-->

  <DrawTemporarySignalLine />
  <!-- <CanvasDraw /> -->
  <Dialogs />
</div>

<style>
  #container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: rgb(37, 37, 37);
    display: flex;
    overflow: hidden;
  }
  .canvas-wrapper {
    width: calc(100vw - 250px);
    /* margin: 10px; */
  }
  .toolbar {
    background-color: rgb(71, 71, 71);
    width: 250px;
    right: 0;
    z-index: 1;
    right: 0;
    position: absolute;
  }
  .canvas {
    z-index: 0;
    position: absolute;
  }
</style>
