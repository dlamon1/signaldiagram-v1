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
  import AddScreenDialog from "./Dialogs/Dialog.AddScreen.svelte";

  import {
    canvasWrapperHeight,
    canvasWrapperWidth,
    isChrome,
    gZoomWrapperRef,
    currentScreenIndex,
  } from "./store";

  import HandleColorLabelUpdates from "./Handlers/Handle.ColorLabelUpdates.svelte";
  import HandleSelectionTab from "./Handlers/Handle.SelectionTab.svelte";
  import InfoBar from "./InfoToolbar/InfoBar.svelte";

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
  <HandleSelectionTab />

  <div class="info">
    <InfoBar />
  </div>

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

  {#if $canvasWrapperWidth && $canvasWrapperHeight && typeof $currentScreenIndex === "number"}
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
  <AddScreenDialog />
</div>

<style>
  #container {
    width: 100vw;
    height: 100vh;
    background-color: rgb(37, 37, 37);
    display: flex;
    overflow: hidden;
  }
  .canvas-wrapper {
    flex: 1;
  }
  .info {
    background-color: rgb(58, 58, 58);
    width: 250px;
    height: 100%;
  }
  .toolbar {
    background-color: rgb(58, 58, 58);
    width: 250px;
    right: 0;
    overflow: scroll;
  }
</style>
