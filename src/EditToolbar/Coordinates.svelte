<script>
  import { showCoordinates, isRearView, opacity } from "../store";
</script>

<div id="general">
  <div id="input-wrapper">
    <input type="checkbox" bind:checked={$showCoordinates} />
    Coordinates
  </div>

  <div id="input-wrapper" class="opacity-wrapper">
    <div>
      <input type="checkbox" bind:checked={$isRearView} />
      Rear View
    </div>
    <input
      type="range"
      min="0"
      max=".5"
      step=".01"
      bind:value={$opacity}
      class="range"
    />
  </div>
</div>

<style>
  .opacity-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 10px; */
  }
  .range {
    margin-top: 5px;
    flex: 0.8;
  }
</style>
