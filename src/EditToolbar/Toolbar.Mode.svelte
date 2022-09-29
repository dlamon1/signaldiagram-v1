<script lang="ts">
  import { mode, isSelectMode, isDrawMode, currentScreenIndex } from "../store";

  $: {
    if ($mode === "draw") {
      $isSelectMode = false;
      $isDrawMode = true;
    }
    if ($mode === "select") {
      $isDrawMode = false;
      $isSelectMode = true;
    }
  }
</script>

<div id="container">
  <div>
    <div>Mode</div>
    <label>
      <input type="radio" bind:group={$mode} name="mode" value="select" />
      Select (SHFT+S)
    </label>
    <div>
      <label>
        <input
          type="radio"
          bind:group={$mode}
          name="mode"
          value="draw"
          disabled={typeof $currentScreenIndex != "number"}
        />
        Draw (SHFT+D)
      </label>
    </div>
  </div>
</div>

<style>
</style>
