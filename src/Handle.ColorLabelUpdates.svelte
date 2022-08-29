<script lang="ts">
  import {
    colorState,
    snapPointLabel,
    panels as PanelsClass,
    snapPoints as snapPointsClass,
    signalLines as signalLinesClass,
  } from "./store";
  import type { ColorObj } from "./Types/ClassTypes";

  const updateLocalLabelAndColorState = () => {
    // console.log("updateLocalLabelAndColorState");
  };

  const updateSelectedSnapPointsLabel = (label: string) => {
    $snapPointsClass.array.forEach((snapPoint, i) => {
      if (snapPoint.isSelected) {
        snapPoint.label = label;
      }
    }),
      ($snapPointsClass = $snapPointsClass);
  };

  const updateSelectedSnapPointsColor = () => {
    $snapPointsClass.array.forEach((sp, i) => {
      if (!sp.isSelected) return;
      sp.setBackgroundColor($colorState.snapPoint.background);
      sp.setFontColor($colorState.snapPoint.font);
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

  $: {
    updateSelectedSnapPointsLabel($snapPointLabel);
  }

  type Key = "panel" | "signalLine" | "snapPoint";

  const updatePanelColorState = () => {
    $PanelsClass.array.forEach((panel) => {
      if (panel.isSelected) {
        $colorState.panel = panel.color;
      }
    });
    $PanelsClass = $PanelsClass;
  };

  $: {
    let t = [$PanelsClass];

    updatePanelColorState();
  }

  const updateSnapPointColorState = () => {
    $snapPointsClass.array.forEach((snapPoint, i) => {
      if (snapPoint.isSelected) {
        $colorState.snapPoint = snapPoint.color;
      }
    }),
      ($snapPointsClass = $snapPointsClass);
  };

  $: {
    let t = [$snapPointsClass];
    updateSnapPointColorState();
  }

  const updateSignalLineColorState = () => {
    $signalLinesClass.array.forEach((signalLine, i) => {
      if (signalLine.isSelected) {
        $colorState.signalLine = signalLine.color;
      }
    }),
      ($signalLinesClass = $signalLinesClass);
  };

  $: {
    let t = [$signalLinesClass];
    updateSignalLineColorState();
  }
</script>
