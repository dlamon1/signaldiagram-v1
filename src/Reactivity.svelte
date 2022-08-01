<script>
  import { onMount, tick } from "svelte";
  import {
    rows,
    columns,
    colors,
    showCoordinates,
    width,
    height,
    isRearView,
    panels,
    toolbarWidth,
    snapPointsQuantity,
    snapPointDirection,
    snapPoints,
    innerWidth,
    innerHeight,
    squares,
    circles,
    canvasWidth,
    canvasHeight,
    clearAllSelections,
    isPrinting,
    title,
    screenAndPanelDimensions,
    scale,
    canvasWrapperWidth,
    canvasWrapperHeight,
    mode,
  } from "./store";

  import { createArray } from "./functions/createArray";
  import { createSnapPoints } from "./functions/createSnapPoints";
  import {
    configurePanelDimensionsForScreen,
    configurePanelDimensionsForPrinting,
  } from "./functions/configurePanelDimesion";

  let ratio = $width / $height;

  // There is a cascading trigger effect here to get the printing
  // to work

  const setCanvasDimensions = async () => {
    // if printing, resize canvas to be 8.5 x 11
    if ($isPrinting) {
      $screenAndPanelDimensions = configurePanelDimensionsForPrinting($title);
      await tick();
    } else {
      $screenAndPanelDimensions = configurePanelDimensionsForScreen();
    }
  };

  const handleNewPanelArray = async () => {
    let oldPanels = $panels;
    let oldSnapPoints = $snapPoints;

    $panels.resetArray();
    $snapPoints.resetArray();

    let snapPointIndex = 0;
    let count = 0;

    for (let i = 0; i < $rows; i++) {
      for (let j = 0; j < $columns; j++) {
        let thisPanelsSnapPointsIndexes = [];
        let oldPanel = oldPanels.array[i];

        for (let k = 1; k < $snapPointsQuantity + 1; k++) {
          $snapPoints.addSnapPoint(i, j, k, count, snapPointIndex);
          thisPanelsSnapPointsIndexes.push(snapPointIndex);
          snapPointIndex += 1;
        }

        $panels.addPanel(i, j, count, thisPanelsSnapPointsIndexes, oldPanel);

        count++;
      }
    }

    $panels = $panels;
  };

  $: {
    clearAllSelections();
    ratio = $width / $height;

    let triggers = {
      $canvasWrapperHeight,
      $canvasWrapperWidth,
      $isPrinting,
      $rows,
      $columns,
      $colors,
      $toolbarWidth,
      $snapPointsQuantity,
      $snapPointDirection,
      $scale,
    };

    setCanvasDimensions();
  }

  // This is triggered by calling setCanvasDimensions()
  $: {
    // console.log("here");
    let t = {
      $screenAndPanelDimensions,
      // $mode,
    };

    handleNewPanelArray();
  }

  $: {
    let triggers = {
      $canvasWidth,
      $canvasHeight,
    };

    handlePrint();
  }

  $: {
    let t = { $mode };

    // $panels.deSelectedPanels();
  }

  const handlePrint = async () => {
    if ($isPrinting) {
      await tick();

      let link = document.createElement("a");
      document.body.appendChild(link);
      link.download = $title + ".png";
      link.href = canvas.toDataURL("image/png");
      link.target = "_blank";
      link.click();

      $isPrinting = false;

      await tick();

      setCanvasDimensions();
    }
  };
</script>
