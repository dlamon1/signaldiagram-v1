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

  const updateSelectedSnapPointsLabel = (label: string) => {
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

  const updatePanelColor = () => {
    $panels.array.forEach((p) => {
      if (p.isSelected) {
        console.count('is selected')
        $panels.array[p.i].setColor("background", $colorState.panel.background);
      }
    });
    $panels = $panels;
  };

  $: {
    updateSelectedSnapPointsLabel($snapPointLabel);
  }

  // $: {
  //   updateSelectedSnapPointsColor($colorState.snapPoint);
  //   console.log("snap points color")
  // }
  
  $: {
    let t = [$colorState]
    updatePanelColor();
    console.log("panel color")
  }

  // $: {
  //   updateSelectedSignalLinesColor($colorState.signalLine.background);
  // }
</script>
