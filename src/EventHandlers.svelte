<script>
  import { onMount, tick } from "svelte";

  import * as d3 from "d3";

  import {
    columns,
    rows,
    snapPointsQuantity,
    snapPointDirection,
    isDrawMode,
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
    topLevelSvgRef,
    canvasWrapperWidth,
    canvasWrapperHeight,
    isSelectMode,
    isMoveMode,
    snapPoints,
    screenAndPanelDimensions,
    transform as transformStore,
  } from "./store";

  $: {
    let triggers = {
      $snapPointsQuantity,
      $snapPointDirection,
      $isDrawMode,
    };

    if ($isDrawMode) {
      $selectionTab = "signallines";
    }
  }

  $: {
    if ($selection === "panels" || $selectionTab === "panels") {
      $selectionTab = "panels";
      $selection === "panels";
      deSelect("panels");
    } else if (
      $selection === "signallines" ||
      $selectionTab === "signallines"
    ) {
      $selectionTab = "signallines";
      $selection === "signallines";
      deSelect("signallines");
    } else if ($selection === "snappoints" || $selectionTab === "snappoints") {
      $selectionTab = "snappoints";
      $selection = "snappoints";
      deSelect("snappoints");
    }
  }

  const deSelect = (type) => {
    if (type != "panels") {
      $panels.deSelect();
    }
    if (type != "signallines") {
      $signalLines.deSelect();
    }
    if (type != "snappoints") {
      $snapPoints.deSelect();
    }
  };

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
    $panels.array.forEach((p) => {
      if (p.isSelected) {
        $panels.array[p.i].setColor("background", color);
      }
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
