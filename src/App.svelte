<script lang="ts">
  import Toolbar from "./EditToolbar/Toolbar.svelte";
  import ExportDialog from "./Dialogs/Exports.svelte";
  import DrawCanvasWrapper from "./DrawComponents/Draw.CanvasWrapper.svelte";
  import DrawPanelWrappers from "./DrawComponents/Draw.PanelWrappers.svelte";
  import DrawSnapPoints from "./DrawComponents/Draw.SnapPoints.svelte";
  import DrawTemporarySignalLine from "./DrawComponents/Draw.TemporarySignalLine.svelte";
  import Zoom from "./DrawComponents/Zoom.svelte";
  import DrawSelecteOutline from "./DrawComponents/Draw.SelecteOutline.svelte";
  import DrawRearViewLabel from "./DrawComponents/Draw.RearViewLabel.svelte";
  import DrawSignalLines from "./DrawComponents/Draw.SignalLines.svelte";
  import BrowserCompatabilityDialog from "./Dialogs/Dialog.BrowserCompatability.svelte";

  import {
    canvasWrapperHeight,
    canvasWrapperWidth,
    isChrome,
    gZoomWrapperRef,
  } from "./store";

  import HandleColorLabelUpdates from "./Handlers/Handle.ColorLabelUpdates.svelte";
  import Reactivity from "./Handlers/Handle.PanelArrayUpdate.svelte";
  import HandleSelectionTab from "./Handlers/Handle.SelectionTab.svelte";

  $gZoomWrapperRef = null;

  const getUseragent = () => {
    const useragent = navigator.userAgent;
    if (useragent.indexOf("Chrome") !== -1) {
      $isChrome = true;
    }
  };

  getUseragent();
</script>

<div id="container">
  <Reactivity />
  <HandleSelectionTab />

  <div
    id="canvas-wrapper"
    class="canvas-wrapper"
    bind:clientWidth={$canvasWrapperWidth}
    bind:clientHeight={$canvasWrapperHeight}
  >
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
    <DrawSignalLines />
    <DrawSnapPoints />
    <DrawRearViewLabel />
  {/if}

  <ExportDialog />
  <BrowserCompatabilityDialog />
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
