<script>
  import {
    isDrawMode,
    signalLines,
    selection,
    panels,
    mode,
    snapPoints as snapPointsClass,
    transform as transformStore,
    setSelection,
  } from "./store";

  $: {
    $selection && deSelect();
  }

  const deSelect = () => {
    if ($selection != "panels") {
      $panels.deSelect();
    }
    if ($selection != "signallines") {
      $signalLines.deSelect();
    }
    if ($selection != "snappoints") {
      $snapPointsClass.deSelect();
    }
  };

  $: {
    if ($isDrawMode) {
      $selection = "signallines";
    }
  }
</script>
