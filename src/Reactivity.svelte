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
    $panels = createArray(
      $rows,
      $columns,
      $canvasWrapperWidth,
      $canvasWrapperHeight,
      $colors,
      ratio,
      $toolbarWidth,
      $panels,
      $scale
    );
  };

  const handleNewSnapPoints = () => {
    let res = createSnapPoints(
      $innerWidth,
      $innerHeight,
      $rows,
      $columns,
      $width,
      $height,
      $snapPointsQuantity,
      $snapPointDirection,
      $squares
    );

    $snapPoints = res.pointArray;
    $snapPoints = $snapPoints;

    $squares = res.squareArray;
    $squares = $squares;

    $circles = res.circleArray;
    $circles = $circles;
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
    let t = {
      $screenAndPanelDimensions,
      $mode,
    };
    handleNewPanelArray();
    // handleNewSnapPoints();
  }

  $: {
    let triggers = {
      $canvasWidth,
      $canvasHeight,
    };

    handlePrint();
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
