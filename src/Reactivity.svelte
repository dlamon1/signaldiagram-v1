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
    let snapPointIndex = 0;

    for (let i = 0; i < $rows; i++) {
      for (let j = 0; j < $columns; j++) {
        let thisPanelsSnapPointsIndexes = [];

        for (let k = 1; k < $snapPointsQuantity + 1; k++) {
          $snapPoints.addSnapPoint();
          thisPanelsSnapPointsIndexes.push(snapPointIndex);
          snapPointIndex += 1;
        }

        //   let colorIndex = 0;
        //   let backgroundColor = colorIndex == 0 ? colors.one : colors.two;

        //   if ((i + j) % 2 === 1) {
        //     colorIndex = 1;
        //   }

        //   if (panels[count]) {
        //     backgroundColor = panels[count].backgroundColor;
        //   }

        //   scale = 1;
        //   // let panelDimension = canvasWidth / columns / ratio;

        //   array.push({
        //     i: count,
        //     row: i,
        //     column: j,
        //     colorIndex: colorIndex,
        //     isSelected: false,
        //     width: panelDimension * ratio * scale,
        //     height: panelDimension * scale,
        //     x: panelDimension * j * ratio * scale + leftPadding,
        //     y: panelDimension * i * scale + topPadding,
        //     color: colorIndex == 0 ? colors.one : colors.two,
        //     lineWidth: 1,
        //     backgroundColor: backgroundColor,
        //     borderColor: "#000000",
        //     showCoordinates: true,
        //     isRearView: false,
        //     thisPanelsSnapPoints,
        //   });

        //   count++;
        console.log(thisPanelsSnapPointsIndexes);
      }
    }

    console.log($snapPoints.array);
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
