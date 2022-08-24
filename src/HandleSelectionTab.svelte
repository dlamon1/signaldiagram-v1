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
    if ($selection == "panels") {
      deSelect("panels");
    }

    if ($selection == "signallines") {
      deSelect("signallines");
    }

    if ($selection == "snappoints") {
      deSelect("snappoints");
    }
  }

  const deSelect = (type) => {
    console.log("DESELECT", type);
    if (type != "panels") {
      console.log("panels");
      $panels.deSelect();
    }
    if (type != "signallines") {
      console.log("signallines");
      $signalLines.deSelect();
    }
    if (type != "snappoints") {
      console.log("snappoints");
      $snapPointsClass.deSelect();
    }
  };

  $: {
    console.log("here");
    if ($isDrawMode) {
      $selection = "signallines";
    }
  }
</script>
