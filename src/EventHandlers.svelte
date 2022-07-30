<script>
  //console.log("canvas render");

  import { onMount, tick } from "svelte";

  import {
    columns,
    rows,
    snapPointsQuantity,
    snapPointDirection,
    isDrawMode,
    clearAllSelections,
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
    svgRef,
    canvasWrapperWidth,
    canvasWrapperHeight,
    isSelectMode,
    isMoveMode,
  } from "./store";

  import * as d3 from "d3";

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

  let zoom = d3.zoom().on("zoom", handleZoom);

  function handleZoom(e) {
    d3.select("svg g").attr("transform", e.transform);
  }

  function initZoom() {
    d3.select("svg").call(zoom);
  }

  function removeZoom() {
    d3.select("svg").on(".zoom", null);
  }

  $: {
    if ($isDrawMode || $isSelectMode) {
      removeZoom();
    }
    if ($isMoveMode) {
      initZoom();
    }
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
</script>

<style>
</style>
