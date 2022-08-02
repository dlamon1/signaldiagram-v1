<script>
  import { canvasWrapperHeight, canvasWrapperWidth, svgRef } from "./store";
  import Panels from "./Reactivity.svelte";
  import EventHandlers from "./EventHandlers.svelte";
  import EditToolbar from "./EditToolbar.svelte";
  import CanvasDraw from "./CanvasDraw.svelte";
  import Dialogs from "./Dialogs/index.svelte";

  import { handleKeyUp, handleKeyDown } from "./functions/events/keys";

  import { onMount } from "svelte";

  const createSvg = () => {
    $svgRef = d3
      .select("#canvas")
      .append("svg")
      .attr("id", "svg")
      .attr("width", $canvasWrapperWidth)
      .attr("height", $canvasWrapperHeight)
      .append("g")
      .attr("width", $canvasWrapperWidth)
      .attr("height", $canvasWrapperHeight)
      .attr("id", "g-zoom-wrapper");
  };

  d3.select("body").on("keydown", handleKeyDown).on("keyup", handleKeyUp);

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
  >
    <div class="canvas" id="canvas">
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
    /* margin: 10px; */
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
    z-index: 0;
    position: absolute;
  }
</style>
