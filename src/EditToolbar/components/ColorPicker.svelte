<script>
  import { selectionTab, colorButtons, colorState } from "../../store";
  import { fly } from "svelte/transition";

  export let key;
  export let layer;
</script>

<div transition:fly={{ y: -10, duration: 110 }}>
  <div id="color-button-container">
    {#each $colorButtons as color}
      <button
        id="color-button"
        style="background-color: {color}"
        on:click={() => {
          $colorState[key][layer] = color;
        }}
      />
    {/each}
  </div>
  <div>
    <input
      type="color"
      id="custom-color-button"
      bind:value={$colorState[key][layer]}
    />
  </div>
</div>

<style>
  #color-button-container {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    width: 100%;
    gap: 9px;
  }
  #custom-color-button {
    width: 100%;
    height: 30px;
    margin-top: 10px;
  }
  #color-button {
    width: 100%;
    padding-top: 80%;
  }
</style>
