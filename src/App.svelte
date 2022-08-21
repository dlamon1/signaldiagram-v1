<script>
  import { canvasWrapperHeight, canvasWrapperWidth, svgRef } from "./store";
  import HandleColorLabelUpdates from "./HandleColorLabelUpdates.svelte";
  import Toolbar from "./Toolbar.svelte";
  import ExportDialog from "./Dialogs/Exports.svelte";
  import DrawPanelRects from "./DrawComponents/DrawPanelsRects.svelte";
  import DrawCanvasWrapper from "./DrawComponents/DrawCanvasWrapper.svelte";
  import DrawPanelWrappers from "./DrawComponents/DrawPanelWrappers.svelte";
  import Reactivity from "./Reactivity.svelte";
  import DrawSnapPointWrappers from "./DrawComponents/DrawSnapPointWrappers.svelte";
  import DrawSnapPointObjects from "./DrawComponents/DrawSnapPointObjects.svelte";
  import DrawCoordinates from "./DrawComponents/DrawCoordinates.svelte";
  import DrawTemporarySignalLine from "./DrawComponents/DrawTemporarySignalLine.svelte";
  import Zoom from "./DrawComponents/Zoom.svelte";
  import DrawSelecteOutline from "./DrawComponents/DrawSelecteOutline.svelte";
  import DrawRearViewLabel from "./DrawComponents/Draw.RearViewLabel.svelte";

  import { gZoomWrapperRef } from "./store";

  import HandleSelectionTab from "./HandleSelectionTab.svelte";

  import * as d3 from "d3";

  $gZoomWrapperRef = null;
</script>

<div id="container">
  <Reactivity />
  <HandleSelectionTab />
  <div id="canvas-wrapper" class="canvas-wrapper">
    <div class="canvas" id="canvas">
      <HandleColorLabelUpdates />
    </div>
  </div>
  <div class="toolbar">
    <Toolbar />
  </div>
  {#if $canvasWrapperWidth && $canvasWrapperHeight}
    <DrawCanvasWrapper />
  {/if}

  {#if $gZoomWrapperRef}
    <Zoom />
    <DrawPanelWrappers />
    <DrawTemporarySignalLine />
    <DrawSelecteOutline />
    <DrawRearViewLabel />
  {/if}

  <ExportDialog />
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
    /* background-color: aqua; */
  }
</style>
