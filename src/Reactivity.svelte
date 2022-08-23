<script>
  import {
    panels as panelsClass,
    snapPoints,
    canvasWrapperWidth,
    canvasWrapperHeight,
    mode,
    signalLines,
    columns,
    rows,
  } from "./store";

  $: {
    let t = [$canvasWrapperHeight, $canvasWrapperWidth, $columns, $rows];

    $canvasWrapperHeight && updatePanelArray();
  }

  let updatePanelArray = () => $panelsClass.updatePanelArray();

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
