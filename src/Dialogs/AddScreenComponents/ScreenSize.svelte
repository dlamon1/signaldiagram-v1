<script lang="ts">
  let columns = 16;
  let rows = 9;
  let width = 160;
  let height = 160;
  let widthMM = 500;
  let heightMM = 500;
  let title = "";

  import { Screen } from "../../classes/ScreenClass";

  import {
    isAddScreenDialogOpen,
    screens,
    currentScreenIndex,
  } from "../../store";

  const addScreen = () => {
    if (
      columns > 0 &&
      rows > 0 &&
      width > 0 &&
      height > 0 &&
      widthMM > 0 &&
      heightMM > 0
    ) {
      let newScreen = new Screen(
        columns,
        rows,
        width,
        height,
        widthMM,
        heightMM,
        title
      );

      $screens.push(newScreen);

      newScreen.panels.initArray(rows, columns);

      $screens = $screens;

      $currentScreenIndex = newScreen.index;

      $isAddScreenDialogOpen = false;
    } else {
      // TODO: Show error message
    }
  };
</script>

<div id="general">
  <div class="title">
    <input type="text" bind:value={title} placeholder="Screen Name" />
  </div>
  <div id="dimensions-container">
    <div class="input-wrapper">
      Columns:
      <input type="number" bind:value={columns} min="1" />
    </div>

    <div class="input-wrapper">
      Rows:
      <input type="number" bind:value={rows} min="1" />
    </div>

    <div class="input-wrapper">
      Width(px):
      <input type="number" bind:value={width} min="1" />
    </div>

    <div class="input-wrapper">
      Height(px):
      <input type="number" bind:value={height} min="1" />
    </div>

    <div class="input-wrapper">
      Width(mm):
      <input type="number" bind:value={widthMM} min="1" />
    </div>

    <div class="input-wrapper">
      Height(mm):
      <input type="number" bind:value={heightMM} min="1" />
    </div>

    <button on:click={addScreen}>Submit</button>
  </div>
</div>

<style>
  button {
    margin-inline: auto;
  }
  .input-wrapper {
    display: flex;
    margin: 10px;
    flex-direction: column;
  }

  #dimensions-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 5px;
  }

  #dimensions-container input {
    width: 100px;
  }
</style>
