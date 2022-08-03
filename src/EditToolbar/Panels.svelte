<script>
  import { fade, fly } from "svelte/transition";

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
  in:fade={{ x: 100, duration: 150 }}
  out:fade={{ x: 0, duration: 40 }}
>
  <div class="title">Panels</div>
  <div class="crisscross">
    <button class="criss-cross" on:click={selectCriss}>Select [0]</button>
    <button class="criss-cross" on:click={selectCross}>select [1]</button>
  </div>

  <div class="subtitle" on:click={() => (isBackgroundOpen = !isBackgroundOpen)}>
    Background
    <div class="color-id-box" style:flex style:background />
  </div>
  {#if isBackgroundOpen}
    <ColorPicker key={"panel"} layer={"background"} />
  {/if}
</div>

<style>
  .criss-cross {
    padding: 5px;
    padding-inline: 15px;
  }
  .color-id-box {
    flex: 0.1;
    width: 10px;
    height: 10px;
    background-color: red;
    margin-left: 5px;
    transition: flex 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 1.5px;
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
