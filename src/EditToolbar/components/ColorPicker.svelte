<script>
  import { colorButtons, colorState } from "../../store";
  import { fly } from "svelte/transition";

  export let key;
  export let layer;
  export let element;
  export let isOpen;

  $: flex = isOpen ? 1 : 0.15;
  $: background = $colorState.panel.background;
</script>

<div class="subtitle" on:click={() => (isOpen = !isOpen)}>
  {element}
  <div class="color-id-box" style:flex style:background />
</div>

{#if isOpen}
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
{/if}

<style>
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
