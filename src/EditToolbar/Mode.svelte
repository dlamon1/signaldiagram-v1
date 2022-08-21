<script>
  import {
    mode,
    selection,
    isSelectMode,
    isDrawMode,
    isMoveMode,
  } from "../store";

  // import { clearSelectedPanels } from "../functions/HandleSelect";

  $: {
    // $isDrawMode = false;
    // $isSelectMode = false;
    // console.log("mode changed");

    if ($mode === "draw") {
      $isSelectMode = false;
      $isDrawMode = true;
      // clearSelectedPanels(d);
    }
    if ($mode === "select") {
      $isDrawMode = false;
      $isSelectMode = true;
      // clearSelectedPanels(d);
    }
  }
</script>

<div id="container">
  <div>
    <div>Mode</div>
    <label>
      <input type="radio" bind:group={$mode} name="mode" value="select" />
      Select(SHFT+S)
    </label>
    <div>
      <label>
        <input type="radio" bind:group={$mode} name="mode" value="draw" />
        Draw(SHFT+D)
      </label>
    </div>
  </div>

  <!-- {#if $isSelectMode} -->
  <!-- <div id="selecting" class={$isSelectMode ? "isSelecting" : "isNotSelecting"}>
    <div>Selecting (SHFT + Drag)</div>
    <label>
      <input
        type="radio"
        bind:group={$selection}
        value="panels"
        disabled={!$isSelectMode}
      />
      Panels
    </label>
    <label>
      <input
        type="radio"
        bind:group={$selection}
        value="snappoints"
        disabled={!$isSelectMode}
      />
      Snaps
    </label>
    <label>
      <input
        type="radio"
        bind:group={$selection}
        value="signallines"
        disabled={!$isSelectMode}
      />
      Lines
    </label>
  </div> -->
  <!-- {/if} -->
</div>

<style>
  .isSelecting {
    opacity: 1;
  }
  .isNotSelecting {
    opacity: 0.3;
  }
  #selecting {
    margin-top: 10px;
  }
</style>
