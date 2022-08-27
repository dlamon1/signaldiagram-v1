<script lang="ts">
  import {
    colorState,
    snapPointLabel,
    panels,
    snapPoints as snapPointsClass,
    signalLines as signalLinesClass,
  } from "./store";

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
    let triggers = {};
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
