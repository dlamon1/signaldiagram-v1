<script lang="ts">
  import {
    colorState,
    snapPointLabel,
    panels as PanelsClass,
    snapPoints as snapPointsClass,
    signalLines as signalLinesClass,
    lineWidthState,
    screens,
    currentScreenIndex,
  } from "../store";

  const updateSelectedSnapPointsLabel = (label: string) => {
    $snapPointsClass?.array.forEach((snapPoint, i) => {
      if (snapPoint.isSelected) {
        snapPoint.label = label;
      }
    }),
      ($snapPointsClass = $snapPointsClass);
  };

  $: {
    updateSelectedSnapPointsLabel($snapPointLabel);
  }

  const updatePanelColorState = () => {
    $PanelsClass.array.forEach((panel) => {
      if (panel.isSelected) {
        $colorState.panel = panel.color;
        $lineWidthState = panel.lineWidth;
      }
    });
    $PanelsClass = $PanelsClass;
  };

  $: {
    let t = [$PanelsClass];

    $PanelsClass && updatePanelColorState();
  }

  const updateSnapPointColorState = () => {
    const screen = $screens[$currentScreenIndex];

    screen.snapPoints.array.forEach((snapPoint, i) => {
      if (snapPoint.isSelected) {
        $colorState.snapPoint = snapPoint.color;
      }
    }),
      ($screens = $screens);
  };

  $: {
    let t = [$snapPointsClass];
    $snapPointsClass && updateSnapPointColorState();
  }

  const updateSignalLineColorState = () => {
    const screen = $screens[$currentScreenIndex];

    screen?.signalLines.array.forEach((signalLine, i) => {
      if (signalLine.isSelected) {
        $colorState.signalLine = signalLine.color;
      }
    }),
      ($screens = $screens);
  };

  $: {
    let t = [$signalLinesClass];

    updateSignalLineColorState();
  }
</script>
