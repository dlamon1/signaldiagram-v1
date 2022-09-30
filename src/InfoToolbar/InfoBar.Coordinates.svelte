<script lang="ts">
  import { screens, currentScreenIndex } from "../store";
</script>

<div class="general">
  <label class="hovered">
    <input
      type="checkbox"
      bind:checked={$screens[$currentScreenIndex].showCoordinates}
    />
    Show Coordinates
  </label>

  <div id="input-wrapper" class="opacity-wrapper">
    <label class="hovered">
      <input
        type="checkbox"
        bind:checked={$screens[$currentScreenIndex].isRearView}
      />
      Rear View
    </label>
    <input
      type="range"
      min="0"
      max=".5"
      step=".01"
      bind:value={$screens[$currentScreenIndex].opacity}
      class="range"
    />
  </div>
</div>

<style>
  .general {
    margin-top: 5px;
  }
  label {
    padding-right: 10px;
  }
  label:hover {
    outline: 1.5px solid rgba(0, 0, 0, 0.445);
  }
  .opacity-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .range {
    margin-top: 5px;
    flex: 0.8;
  }
</style>
