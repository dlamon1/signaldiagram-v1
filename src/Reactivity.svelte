<script>
  import { onMount, tick } from "svelte";
  import {
    rows,
    columns,
    width,
    height,
    panels as panelsClass,
    toolbarWidth,
    snapPointsQuantity,
    snapPointDirection,
    snapPoints,
    isDrawMode,
    isPrinting,
    title,
    scale,
    canvasWrapperWidth,
    canvasWrapperHeight,
    mode,
    signalLines,
  } from "./store";

  $: {
    let t = [$canvasWrapperHeight, $canvasWrapperWidth];

    $canvasWrapperHeight && updatePanelArray();
  }

  let updatePanelArray = () => $panelsClass.updatePanelArray();

  let l = $panelsClass.array;

  $: {
    let t = { $mode };

    deSelectAllObjects();
  }

  const deSelectAllObjects = () => {
    $panelsClass.deSelect();
    $signalLines.deSelect();
    $snapPoints.deSelect();
  };
</script>
