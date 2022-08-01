<script>
  import { onMount, tick } from "svelte";

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
    svgRef,
    canvasWrapperWidth,
    canvasWrapperHeight,
    isSelectMode,
    isMoveMode,
    screenAndPanelDimensions,
  } from "./store";

  // import { clearSelectedPanels } from "./functions/HandleSelect";

  // import * as d3 from "d3";

  $: {
    let triggers = { $columns, $rows };

    // clearSelectedPanels();
  }

  $: {
    let triggers = {
      $snapPointsQuantity,
      $snapPointDirection,
      $isDrawMode,
    };

    if ($isDrawMode) {
      $selectionTab = "lines";
      // clearSelectedPanels();
    }
  }

  let zoom = d3
    .zoom()
    .scaleExtent([
      0.5,
      $canvasWrapperHeight / $screenAndPanelDimensions.panelDimension,
    ])
    // .translateExtent([
    //   [0, 0],
    //   [$canvasWrapperWidth, $canvasWrapperHeight],
    // ])
    .on("zoom", handleZoom);

  function handleZoom(e) {
    d3.select("svg g").attr("transform", e.transform);
  }

  function initZoom() {
    d3.select("svg").call(zoom);
  }

  function removeZoom() {
    d3.select("svg").on(".zoom", null);
  }

  const addOnHoverIdTag = () => {
    d3.select("svg").selectAll("g").attr("id", "g-onhover");
  };

  $: {
    // this svgfRef is required because the ref doesn't exist
    // when this is initialized

    let t = $svgRef;

    if ($isDrawMode) {
      addOnHoverIdTag();
      removeZoom();
    }
    if ($isSelectMode) {
      $svgRef && initZoom();
    }
  }

  $: {
    if ($selection === "panels") {
      $selectionTab = "panels";
    } else if ($selection === "signallines") {
      $selectionTab = "lines";
    } else if ($selection === "snapPoints") {
      $selectionTab = "snapPoints";
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
    $panels.array.forEach((p) => {
      if (p.isSelected) {
        $panels.array[p.i].setColor("background", color);
      }
    });
    // $panels = $panels;
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
