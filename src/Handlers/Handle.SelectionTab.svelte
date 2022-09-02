<script lang="ts">
  import {
    isDrawMode,
    signalLines,
    selection,
    panels,
    snapPoints as snapPointsClass,
  } from "../store";

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
