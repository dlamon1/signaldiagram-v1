<script>
  import { fly } from "svelte/transition";

  import { panels, updatePanels, colorState } from "../store";

  import ColorPicker from "./components/ColorPicker.svelte";

  let isBackgroundOpen = true;

  $: flex = isBackgroundOpen ? 1 : 0.15;
  $: background = $colorState.panel.background;

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

<div
  id="panels"
  in:fly={{ x: 100, duration: 120 }}
  out:fly={{ x: 0, duration: 120 }}
>
  <div class="title">Panels</div>
  <div class="crisscross">
    <button on:click={selectCriss}>Select [0]</button>
    <button on:click={selectCross}>select [1]</button>
  </div>

  <div class="subtitle" on:click={() => (isBackgroundOpen = !isBackgroundOpen)}>
    Background
    <!-- Background {isBackgroundOpen ? "▼" : "▲"} -->
    <!-- {#if isBackgroundOpen} -->
    <div class="color-id-box" style:flex style:background />
    <!-- {/if} -->
  </div>
  {#if isBackgroundOpen}
    <ColorPicker key={"panel"} layer={"background"} />
  {/if}
</div>

<style>
  .color-id-box {
    flex: 0.2;
    width: 10px;
    height: 10px;
    background-color: red;
    margin-left: 5px;
    transition: flex 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .subtitle {
    margin-top: 10px;
    display: flex;
    /* background-color: green; */
    align-items: center;
  }
  .crisscross {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
  }
  .title {
    font-size: 1.2em;
    font-weight: bold;
  }
  #panels {
    position: absolute;
    flex: 1;
    width: 100%;
  }
</style>
