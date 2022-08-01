<script>
  import {
    mode,
    selection,
    isSelectMode,
    isDrawMode,
    isMoveMode,
    panels,
    updatePanels,
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

  const selectCriss = () => {
    $panels.array.forEach((p) => {
      p.setIsSelected(false);
      if (p.colorIndex == 0) {
        p.setIsSelected(true);
      }
      updatePanels();
    });
  };

  const selectCross = () => {
    $panels.array.forEach((p) => {
      p.setIsSelected(false);
      if (p.colorIndex == 1) {
        p.setIsSelected(true);
      }
      updatePanels();
    });
  };
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
  <div class="crisscross">
    <button on:click={selectCriss}>Select [0]</button>
    <button on:click={selectCross}>select [1]</button>
  </div>
  <!-- {/if} -->
</div>

<style>
  .crisscross {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
  }
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
