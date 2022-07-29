<script>
  import Panels from "./Reactivity.svelte";
  import EventHandlers from "./EventHandlers.svelte";
  import EditToolbar from "./EditToolbar.svelte";
  import CanvasDraw from "./CanvasDraw.svelte";
  import Dialogs from "./Dialogs/index.svelte";

  import { handleKeyUp, handleKeyDown } from "./functions/events/keys";
  import { handleMouseDown } from "./functions/events/mouseDown";
  import { handleMouseMove } from "./functions/events/mouseMove.js";
  import { handleMouseUp } from "./functions/events/mouseUp";

  import {
    canvasWidth,
    canvasHeight,
    scale,
    innerWidth,
    innerHeight,
    screenAndPanelDimensions,
    columns,
    width,
    height,
    ratio,
    canvasWrapperHeight,
    canvasWrapperWidth,
  } from "./store";
  import * as d3 from "d3";

  let count = 1;
  let ref = null;
  let xOffset = 0;
  let yOffset = 0;

  let oldX = 0;
  let oldY = 0;

  const handleScroll = (e) => {
    let sw =
      ($screenAndPanelDimensions.panelDimension * $columns * $scale * $width) /
      $height;
    // console.log(e.x - e.x * $scale);

    // console.log(xOffset);
    // xOffset = e.x - oldX * $scale;
    // yOffset = e.y - oldY * $scale;

    oldX = e.x;
    oldY = e.y;

    requestAnimationFrame(() => {
      let scaleDelta = e.deltaY / 3000;

      if (count - scaleDelta >= 0.5 && count - scaleDelta <= 2) {
        count -= scaleDelta;

        d3.select("#svg")
          .attr("width", $canvasWrapperWidth * count)
          .attr("height", $canvasWrapperHeight * count);

        $scale = count;
      }
    });
  };

  // $: console.log($canvasWrapperHeight, $canvasWrapperWidth);
</script>

<!-- <svelte:window bind:innerWidth={$innerWidth} bind:innerHeight={$innerHeight} /> -->

<div id="container">
  <Panels />
  <div
    class="canvas-wrapper"
    bind:clientHeight={$canvasWrapperHeight}
    bind:clientWidth={$canvasWrapperWidth}
    on:scroll={handleScroll}
    on:keydown={handleKeyDown}
    on:keyup={handleKeyUp}
    on:mousewheel={handleScroll}
    on:mousemove={handleMouseMove}
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
  >
    <div
      class="canvas"
      id="canvas"
      style="left: {xOffset}px; top: {yOffset}px"
      bind:this={ref}
    >
      <EventHandlers />
    </div>
  </div>
  <div class="toolbar">
    <EditToolbar />
  </div>
  <CanvasDraw />
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
    /* flex: 1; */
    /* background-color: rgba(0, 255, 0);s */
  }
  .toolbar {
    background-color: rgb(255, 0, 0);
    width: 250px;
    right: 0;
    z-index: 1;
    right: 0;
    position: absolute;
  }
  .canvas {
    /* background-color: rgb(0, 0, 255); */
    z-index: 0;
    position: absolute;
    /* top: -100px; */
  }
</style>
