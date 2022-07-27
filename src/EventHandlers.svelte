<script>
  //console.log("canvas render");

  import { onMount, tick } from "svelte";

  import {
    columns,
    rows,
    snapPointsQuantity,
    snapPointDirection,
    isDrawMode,
    canvasRef,
    ctxRef,
    textInputRef,
    clearAllSelections,
    squares,
    signalLines,
    selection,
    selectionTab,
    selectedPanels,
    selectedSquares,
    selectedSnapPoints,
    selectedSignalLines,
    colorState,
    snapPointLabel,
    panels,
    canvasWidth,
    canvasHeight,
    innerWidth,
    innerHeight,
    scale,
    svgRef,
    // canvasWidth,
    // canvasHeight,
  } from "./store";

  import { handleKeyUp, handleKeyDown } from "./functions/events/keys";
  import { handleMouseDown } from "./functions/events/mouseDown";
  import { handleMouseMove } from "./functions/events/mouseMove.js";
  import { handleMouseUp } from "./functions/events/mouseUp";

  import * as d3 from "d3";

  let canvas;
  let ctx;

  $: {
    let triggers = { $columns, $rows };

    clearAllSelections();
  }

  $: {
    let triggers = {
      $snapPointsQuantity,
      $snapPointDirection,
      $isDrawMode,
    };

    if ($isDrawMode) {
      $selectionTab = "lines";
      clearAllSelections();
    }
  }

  $: {
    let triggers = {
      $squares,
    };
  }

  $: {
    if ($selection === "panels") {
      $selectionTab = "panels";
    } else if ($selection === "signallines") {
      $selectionTab = "lines";
    } else if ($selection === "snappoints") {
      $selectionTab = "squares";
    }
  }

  const setCanvasDimensions = (width, height) => {
    canvas.width = width;
    canvas.height = height;

    let w = width.toString() + "px";
    let h = height.toString() + "px";

    canvas.style.width = w;
    canvas.style.height = h;
  };

  $: {
    if (canvas) {
      setCanvasDimensions($canvasWidth, $canvasHeight);
    }
  }

  const updateLocalLabelAndColorState = () => {
    if ($selectedSquares.length > 1) return;
    $selectedSquares.forEach((squares, i) => {
      $snapPointLabel = squares.label;
      $colorState.snapPoint.background = squares.backgroundColor;
      $colorState.snapPoint.outline = squares.outlineColor;
      $colorState.snapPoint.font = squares.fontColor;
    });
  };

  const updateSelectedSnapPointsLabel = (label) => {
    $selectedSquares.forEach((point, i) => {
      $selectedSquares[i].label = label;
    });
    $selectedSquares = $selectedSquares;
  };

  const updateSelectedSnapPointsColor = (color) => {
    $selectedSquares.forEach((point, i) => {
      $selectedSquares[i].backgroundColor = color.background;
      $selectedSquares[i].outlineColor = color.outline;
      $selectedSquares[i].fontColor = color.font;
    });
    $selectedSquares = $selectedSquares;
  };

  const updateSelectedSignalLinesColor = (color) => {
    $selectedSignalLines.forEach((line, i) => {
      line.updateColor(color);
    });
    $signalLines = $signalLines;
  };

  const updatePanelColor = (color) => {
    $selectedPanels.forEach((p, i) => {
      $panels[p.i].backgroundColor = color;
    });
    $panels = $panels;
  };

  $: {
    let triggers = {
      $selectedPanels,
      $selectedSnapPoints,
      $selectedSignalLines,
    };
    updateLocalLabelAndColorState();
  }

  $: {
    updateSelectedSnapPointsLabel($snapPointLabel);
    // $textInputRef && $textInputRef.focus();
  }

  $: {
    updateSelectedSnapPointsColor($colorState.snapPoint);
    // $textInputRef && $textInputRef.focus();
  }

  $: {
    updatePanelColor($colorState.panel.background);
  }

  $: {
    updateSelectedSignalLinesColor($colorState.signalLine.background);
  }

  const sizeCanvas = () => {
    $svgRef = d3
      .select("#svgcontainer")
      .append("svg")
      .attr("id", "svg")
      .attr("width", $canvasWidth)
      .attr("height", $canvasHeight);
  };

  onMount(() => {
    sizeCanvas();
  });
</script>

<svelte:window
  on:keydown={handleKeyDown}
  on:keyup={handleKeyUp}
  bind:innerWidth={$innerWidth}
  bind:innerHeight={$innerHeight}
/>

<div
  id="svgcontainer"
  on:mousemove={handleMouseMove}
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
/>

<style>
  #svgcontainer {
    height: 0px;
    width: 0px;
    z-index: -1;
    background-color: rgb(37, 37, 37);
    /* transform: scale(1.5); */
  }
</style>
