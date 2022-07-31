<script>
  import {
    mode,
    selection,
    isSelectMode,
    isDrawMode,
    isMoveMode,
  } from "../store";

  import { clearSelectedPanels } from "../functions/HandleSelect";

  $: {
    $isDrawMode = false;
    $isSelectMode = false;

    if ($mode === "draw") {
      $isDrawMode = true;
      // clearSelectedPanels(d);
    }
    if ($mode === "select") {
      $isSelectMode = true;
      // clearSelectedPanels(d);
    }
  }
</script>

<div id="container">
  <div>
    <div>Mode.</div>
    <label>
      <input type="radio" bind:group={$mode} name="mode" value="select" />
      Select(s)
    </label>
    <label>
      <input type="radio" bind:group={$mode} name="mode" value="draw" />
      Draw(d)
    </label>
  </div>

  <!-- {#if $isSelectMode} -->
  <div id="selecting" class={$isSelectMode ? "isSelecting" : "isNotSelecting"}>
    <div>Selecting (SHIFT + Drag)</div>
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
  </div>
  <!-- {/if} -->
</div>

<style>
  #container {
    /* height: 80px; */
  }
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
