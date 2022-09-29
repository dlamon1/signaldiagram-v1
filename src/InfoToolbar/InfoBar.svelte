<script lang="ts">
  import Coordinates from "./InfoBar.Coordinates.svelte";
  import LineCounter from "./InfoBar.LineCounter.svelte";
  import Links from "./InfoBar.Links.svelte";
  import SnapPointOptions from "./InfoBar.SnapPointOptions.svelte";

  import { isAddScreenDialogOpen, screens, currentScreenIndex } from "../store";

  const selectPanel = (i: number) => {
    $currentScreenIndex = i;
  };
</script>

<div class="container">
  <button class="dialog" on:click={() => ($isAddScreenDialogOpen = true)}>
    Add Screen
  </button>

  <div class="divider" />

  {#each $screens as screen, i}
    <button
      class="screen-button"
      on:click={() => selectPanel(i)}
      class:selected={i == $currentScreenIndex}
    >
      {screen.name}
    </button>
  {/each}

  <LineCounter />

  <div class="spacer" />

  <Links />
</div>

<style>
  .selected {
    background-color: rgb(42, 109, 255);
    color: white;
    border-color: chartreuse;
    border-width: 1px;
    border-style: solid;
  }
  .screen-button {
    height: 40px;
    margin-top: 5px;
  }

  .dialog {
    height: 40px;
  }

  .spacer {
    flex: 1;
  }

  .container {
    width: calc(100% - 10px);
    height: calc(100vh - 10px);
    color: #f7f7f7;
    font-size: 1em;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    user-select: none;
    margin: 5px;
  }
</style>
