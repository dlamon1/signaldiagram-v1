<script>
  import { onMount, tick } from "svelte";
  import {
    rows,
    columns,
    colors,
    width,
    height,
    panels as panelsClass,
    toolbarWidth,
    snapPointsQuantity,
    snapPointDirection,
    snapPoints,
    // canvasWidth,
    // canvasHeight,
    clearAllSelections,
    isPrinting,
    title,
    screenAndPanelDimensions,
    scale,
    canvasWrapperWidth,
    canvasWrapperHeight,
    mode,
    signalLines,
  } from "./store";

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
      // console.log("config screen and panel dimensions");
      $screenAndPanelDimensions = configurePanelDimensionsForScreen();
    }
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
      // $colors,
      // $toolbarWidth,
      // $snapPointsQuantity,
      // $snapPointDirection,
    };

    setCanvasDimensions();
  }

  // $: console.log($canvasWrapperWidth, ", " + $canvasWrapperHeight);
  // This is triggered by calling setCanvasDimensions()
  $: {
    // console.log("triggered");

    let t = {
      $screenAndPanelDimensions,
    };

    $screenAndPanelDimensions && updatePanelArray();
    // console.log($panelsClass.array.length);
    // handleNewPanelArray();
  }

  let updatePanelArray = () => $panelsClass.updatePanelArray();

  let l = $panelsClass.array;

  $: console.log(l);

  // $: {
  //   let triggers = {
  //     $canvasWidth,
  //     $canvasHeight,
  //   };

  //   handlePrint();
  // }

  $: {
    let t = { $mode };

    deSelectAllObjects();
  }
  const deSelectAllObjects = () => {
    $panelsClass.deSelect();
    $signalLines.deSelect();
    $snapPoints.deSelect();
  };

  // const handlePrint = async () => {
  //   if ($isPrinting) {
  //     await tick();

  //     let link = document.createElement("a");
  //     document.body.appendChild(link);
  //     link.download = $title + ".png";
  //     link.href = canvas.toDataURL("image/png");
  //     link.target = "_blank";
  //     link.click();

  //     $isPrinting = false;

  //     await tick();

  //     setCanvasDimensions();
  //   }
  // };
</script>
