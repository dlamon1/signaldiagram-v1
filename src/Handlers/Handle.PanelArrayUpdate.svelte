<script lang="ts">
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
  } from "../store";

  $: {
    let t = [
      $canvasWrapperHeight,
      $canvasWrapperWidth,
      $columns,
      $rows,
      $width,
      $height,
    ];

    $canvasWrapperHeight && updatePanelArray();
  }

  let updatePanelArray = () =>
    !$isExportDialogOpen && $panelsClass.updatePanelArray();
</script>
