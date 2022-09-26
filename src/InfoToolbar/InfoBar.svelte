<script lang="ts">
  import ScreenSize from "./InfoBar.ScreenSize.svelte";
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
    <button class="screen-button" on:click={() => selectPanel(i)}
      >{screen.name}</button
    >
  {/each}

  <div class="divider" />

  <div id="general">
    <Coordinates />
  </div>

  <div class="divider" />

  <div id="general">
    <SnapPointOptions />
  </div>

  <div class="divider" />

  <LineCounter />

  <div class="spacer" />

  <Links />
</div>

<style>
  .screen-button {
    height: 40px;
    margin-top: 5px;
  }

  .dialog {
    height: 40px;

    /* width: 96.5%; */
  }

  .divider {
    height: 1px;
    background-color: #ccc;
    margin-top: 10px;
  }
  .spacer {
    flex: 1;
  }

  #general {
    margin-top: 0px;
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
