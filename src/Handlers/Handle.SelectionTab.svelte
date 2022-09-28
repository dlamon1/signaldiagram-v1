<script lang="ts">
  import { isDrawMode, selection, screens, currentScreenIndex } from "../store";

  $: {
    $selection && typeof $currentScreenIndex === "number" && deSelect();
  }

  const deSelect = () => {
    const screen = $screens[$currentScreenIndex];
    if ($selection != "panels") {
      screen.panels.deSelect();
    }
    if ($selection != "signallines") {
      screen.signalLines.deSelect();
    }
    if ($selection != "snappoints") {
      screen.snapPoints.deSelect();
    }
  };

  $: {
    if ($isDrawMode) {
      $selection = "signallines";
    }
  }
</script>
