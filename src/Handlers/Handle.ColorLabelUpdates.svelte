<script lang="ts">
  import {
    colorState,
    snapPointLabel,
    lineWidthState,
    screens,
    currentScreenIndex,
  } from "../store";

  const updateSelectedSnapPointsLabel = (label: string) => {
    const screen = $screens[$currentScreenIndex];
    screen?.snapPoints.array.forEach((snapPoint, i) => {
      if (snapPoint.isSelected) {
        snapPoint.label = label;
      }
    }),
      ($screens = $screens);
  };

  $: {
    updateSelectedSnapPointsLabel($snapPointLabel);
  }

  const updatePanelColorState = () => {
    const screen = $screens[$currentScreenIndex];

    screen?.panels.array.forEach((panel) => {
      if (panel.isSelected) {
        $colorState.panel = panel.color;
        $lineWidthState = panel.lineWidth;
      }
    });
    $screens = $screens;
  };

  $: {
    let t = [$screens];

    updatePanelColorState();
  }

  const updateSnapPointColorState = () => {
    const screen = $screens[$currentScreenIndex];

    screen?.snapPoints.array.forEach((snapPoint, i) => {
      if (snapPoint.isSelected) {
        $colorState.snapPoint = snapPoint.color;
      }
    }),
      ($screens = $screens);
  };

  // $: {
  //   let t = [$snapPointsClass];
  //   $snapPointsClass && updateSnapPointColorState();
  // }

  const updateSignalLineColorState = () => {
    const screen = $screens[$currentScreenIndex];

    screen?.signalLines.array.forEach((signalLine, i) => {
      if (signalLine.isSelected) {
        $colorState.signalLine = signalLine.color;
      }
    }),
      ($screens = $screens);
  };

  // $: {
  //   let t = [$signalLinesClass];

  //   updateSignalLineColorState();
  // }
</script>
