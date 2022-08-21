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
    if ($selection != "panels") {
      deSelect("panels");
    }

    if ($selection != "signallines") {
      deSelect("signallines");
    }

    if ($selection != "snappoints") {
      deSelect("snappoints");
    }
  }

  const deSelect = (type) => {
    if (type != "panels") {
      $panels.deSelect();
    }
    if (type != "signallines") {
      $signalLines.deSelect();
    }
    if (type != "snappoints") {
      $snapPointsClass.deSelect();
    }
  };
</script>
