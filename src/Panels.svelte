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

  const setCanvasDimensions = async () => {
    // if printing, resize canvas to be 8.5 x 11
    if ($isPrinting) {
      dimensions = configurePanelDimensionsForPrinting($title);
      $screenAndPanelDimensions = configurePanelDimensionsForPrinting($title);

      await tick();

      $canvasWidth = dimensions.newCanvasWidth;
      $canvasHeight = dimensions.newCanvasHeight;

      await tick();
    } else {
      dimensions = configurePanelDimensionsForScreen();
      $screenAndPanelDimensions = configurePanelDimensionsForPrinting($title);
      $canvasWidth = dimensions.newCanvasWidth;
      $canvasHeight = dimensions.newCanvasHeight;
    }
  };

  const handleNewPanelArray = async () => {
    panels.update((p) =>
      createArray(
        dimensions,
        $rows,
        $columns,
        $canvasWidth,
        $canvasHeight,
        $colors,
        ratio,
        $toolbarWidth,
        $panels
      )
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
      $innerWidth,
      $innerHeight,
      $isPrinting,
      $rows,
      $columns,
      $colors,
      $toolbarWidth,
      $snapPointsQuantity,
      $snapPointDirection,
    };

    setCanvasDimensions();
  }

  // This is triggered by calling setCanvasDimensions()
  $: {
    let a = $screenAndPanelDimensions;
    handleNewPanelArray();
    handleNewSnapPoints();
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

  $: {
    let _panels = $panels;
    _panels.forEach((p) => (p.showCoordinates = $showCoordinates));
    panels.update((p) => _panels);
  }

  $: {
    let _panels = $panels;
    _panels.forEach((p) => (p.isRearView = $isRearView));
    panels.update((p) => _panels);
  }
</script>
