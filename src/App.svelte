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
    svgRef,
  } from "./store";

  import * as d3 from "d3";
  import { onMount } from "svelte";

  let count = 1;

  let ref = null;
  let xOffset = 0;
  let yOffset = 0;

  let oldX = 0;
  let oldY = 0;

  let transformy;
  let transformx;

  const handleScroll = (e) => {
    oldX = e.x;
    oldY = e.y;

    requestAnimationFrame(() => {
      let scaleDelta = e.deltaY / 3000;

      if (count - scaleDelta >= 0.5 && count - scaleDelta <= 5) {
        count -= scaleDelta;

        // d3.select("#svg")
        //   .attr("width", $canvasWrapperWidth * count)
        //   .attr("height", $canvasWrapperHeight * count);

        // console.log(count);

        console.log(e.x);
        $scale = count;

        xOffset = e.x + "px";
        yOffset = e.y + "px";

        // transformy = (count * e.y) / (count - 1);
        // transformx = (count * e.x) / (count - 1);

        // xOffset = 0;
        // yOffset = 0;

        // xOffset = e.x * count;
        // yOffset = e.y * count;

        // scalechange = newscale - oldscale;
        // offsetX = -(zoomPointX * scalechange);
        // offsetY = -(zoomPointY * scalechange);
      }
    });
  };

  const createSvg = () => {
    $svgRef = d3
      .select("#canvas")
      .append("svg")
      .attr("id", "svg")
      .attr("width", $canvasWrapperWidth)
      .attr("height", $canvasWrapperHeight)
      .append("g")
      .attr("width", $canvasWrapperWidth)
      .attr("height", $canvasWrapperHeight);
  };

  onMount(() => {
    createSvg();
  });
</script>

<div id="container">
  <Panels />
  <div
    class="canvas-wrapper"
    bind:clientHeight={$canvasWrapperHeight}
    bind:clientWidth={$canvasWrapperWidth}
    on:keydown={handleKeyDown}
    on:keyup={handleKeyUp}
    on:mousemove={handleMouseMove}
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
  >
    <!-- <div
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
  > -->
    <div
      class="canvas"
      id="canvas"
      style="--scale: {$scale}; --xOffset: {xOffset}; --yOffset: {yOffset};"
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
    /* transform: scale(var(--scale));
    transform-origin: var(--xOffset) var(--yOffset); */
    /* top: -100px; */
  }
</style>
