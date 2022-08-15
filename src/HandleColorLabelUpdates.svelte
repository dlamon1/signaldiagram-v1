<script>
  import { line } from "d3";

  import {
    snapPointsQuantity,
    snapPointDirection,
    isDrawMode,
    selectionTab,
    selectedPanels,
    selectedSquares,
    selectedSnapPoints,
    selectedSignalLines,
    colorState,
    snapPointLabel,
    panels,
    snapPoints as snapPointsClass,
    signalLines as signalLinesClass,
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

  const updateSelectedSnapPointsColor = (colorObj) => {
    $snapPointsClass.array.forEach((sp, i) => {
      if (!sp.isSelected) return;
      sp.setBackgroundColor(colorObj.background);
      sp.setFontColor(colorObj.font);
    });
    $snapPointsClass = $snapPointsClass;
  };

  const updateSelectedSignalLinesColor = (color) => {
    // console.log("signal line color ");

    $signalLinesClass.array.forEach((line, i) => {
      // console.log(line);
      if (line.isSelected) {
        console.log(line);
        line.updateColor(color);
      }
    });

    // $selectedSignalLines.forEach((line, i) => {
    //   line.updateColor(color);
    // });
    $signalLinesClass = $signalLinesClass;
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
  }

  $: {
    updateSelectedSnapPointsColor($colorState.snapPoint);
    // console.log($colorState);
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
