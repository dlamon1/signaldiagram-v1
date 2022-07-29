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
  } from "./store";

  import { createArray } from "./functions/createArray";
  import { createSnapPoints } from "./functions/createSnapPoints";
  import {
    configurePanelDimensionsForScreen,
    configurePanelDimensionsForPrinting,
  } from "./functions/configurePanelDimesion";

  let ratio = $width / $height;

  let dimensions;

  // There is a cascading trigger effect here to get the printing
  // to work

  // $: {
  //   let t = $screenAndPanelDimensions;
  //   console.log(
  //     ($screenAndPanelDimensions.panelDimension * $columns * $width) / $height,
  //     $canvasWrapperWidth
  //   );
  // }

  const setCanvasDimensions = async () => {
    // console.log("here");
    // if printing, resize canvas to be 8.5 x 11
    if ($isPrinting) {
      $screenAndPanelDimensions = configurePanelDimensionsForPrinting($title);
      await tick();
    } else {
      // let x = configurePanelDimensionsForScreen();
      // console.log(x);
      // console.log("here");
      $screenAndPanelDimensions = configurePanelDimensionsForScreen();
      // console.log($screenAndPanelDimensions);
    }
  };

  const handleNewPanelArray = async () => {
    $panels = createArray(
      // dimensions,
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
      dimensions,
      $innerWidth,
      $innerHeight,
      $rows,
      $columns,
      $width,
      $height,
      $toolbarWidth,
      $snapPointsQuantity,
      $snapPointDirection,
      ratio,
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

    // let timeout = setTimeout(() => {
    //   console.log(timeout);
    setCanvasDimensions();
    // }, 3);

    // timeout();
  }

  // This is triggered by calling setCanvasDimensions()
  $: {
    let a = $screenAndPanelDimensions;
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
      //console.log("is printing");
      //console.log($canvasWidth, $canvasHeight);

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
