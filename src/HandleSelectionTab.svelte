<script>
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
    mode,
    snapPoints as snapPointsClass,
    screenAndPanelDimensions,
    transform as transformStore,
    setSelectionTab,
    setSelection,
  } from "./store";

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
      $snapPointsClass.deSelect();
    }
  };

  const handleSelectionTab = () => {
    if ($isDrawMode) {
      setSelectionTab("lines");
      setSelection("lines");
    }
  };

  $: {
    let t = { $mode };

    handleSelectionTab();
  }
</script>
