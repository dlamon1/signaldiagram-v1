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
    width,
    height,
    isExportDialogOpen,
  } from "./store";

  let isOpen = $isExportDialogOpen;

  $: {
    let t = [
      $canvasWrapperHeight,
      $canvasWrapperWidth,
      $columns,
      $rows,
      $width,
      $height,
    ];

    $canvasWrapperHeight && !isOpen && updatePanelArray();
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
