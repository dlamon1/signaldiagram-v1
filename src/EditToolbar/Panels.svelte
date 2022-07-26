<script>
  import { fly } from "svelte/transition";

  import ColorPicker from "./components/ColorPicker.svelte";

  let isBackgroundOpen = true;
</script>

<div
  id="panels"
  in:fly={{ x: 100, duration: 120 }}
  out:fly={{ x: 0, duration: 120 }}
>
  <div class="title">Panels</div>
  <div class="subtitle" on:click={() => (isBackgroundOpen = !isBackgroundOpen)}>
    Background {isBackgroundOpen ? "▼" : "▲"}
  </div>
  {#if isBackgroundOpen}
    <ColorPicker key={"panel"} layer={"background"} />
  {/if}
</div>

<style>
  .title {
    font-size: 1.2em;
    font-weight: bold;
  }
  .subtitle {
    margin-top: 10px;
  }
  #panels {
    position: absolute;
    flex: 1;
    width: 100%;
  }
</style>
