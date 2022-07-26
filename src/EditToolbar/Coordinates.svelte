<script>
  import { showCoordinates, isRearView } from "../store";
</script>

<div id="general">
  <div id="input-wrapper">
    <input type="checkbox" bind:checked={$showCoordinates} />
    Coordinates
  </div>

  <div id="input-wrapper">
    <input type="checkbox" bind:checked={$isRearView} />
    Rear View
  </div>
</div>

<style>
</style>
