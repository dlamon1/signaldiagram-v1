<script>
  import {
    snapPointsQuantity,
    snapPointDirection,
    isDrawMode,
    selectedPanels,
    selectedSnapPoints,
    selectedSignalLines,
    colorState,
    snapPointLabel,
    panels,
    snapPoints as snapPointsClass,
    signalLines as signalLinesClass,
    selection,
  } from "./store";

  $: {
    let triggers = {
      $snapPointsQuantity,
      $snapPointDirection,
      $isDrawMode,
    };

    if ($isDrawMode) {
      $selection = "lines";
    }
  }

  const updateLocalLabelAndColorState = () => {
    // console.log("updateLocalLabelAndColorState");
  };

  const updateSelectedSnapPointsLabel = (label) => {
    $snapPointsClass.array.forEach((snapPoint, i) => {
      if (snapPoint.isSelected) {
        snapPoint.label = label;
      }
    }),
      ($snapPointsClass = $snapPointsClass);
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
    $signalLinesClass.array.forEach((line, i) => {
      if (line.isSelected) {
        line.updateColor(color);
      }
    });

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
  }

  $: {
    updatePanelColor($colorState.panel.background);
  }

  $: {
    updateSelectedSignalLinesColor($colorState.signalLine.background);
  }
</script>
