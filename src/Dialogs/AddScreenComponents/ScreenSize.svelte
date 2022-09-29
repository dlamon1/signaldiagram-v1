<script lang="ts">
  import { onMount } from "svelte";

  import { Screen } from "../../classes/ScreenClass";

  import {
    isAddScreenDialogOpen,
    screens,
    currentScreenIndex,
  } from "../../store";

  let inputRef;

  const selectAll = (event: Event) => {
    const target = event.target as HTMLInputElement;
    target.select();
  };

  onMount(() => inputRef?.focus());

  let columns = 16;
  let rows = 9;
  let width = 160;
  let height = 160;
  let widthMM = 500;
  let heightMM = 500;
  let title = "";

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
  <div class="loose">Add Screen</div>

  <div class="title">
    <input
      type="text"
      bind:value={title}
      bind:this={inputRef}
      placeholder="Screen Name"
      on:focus={(event) => selectAll(event)}
    />
  </div>
  <div id="dimensions-container">
    <div class="input-wrapper">
      Columns:
      <input
        type="number"
        bind:value={columns}
        min="1"
        on:focus={(event) => selectAll(event)}
      />
    </div>

    <div class="input-wrapper">
      Rows:
      <input
        type="number"
        bind:value={rows}
        min="1"
        on:focus={(event) => selectAll(event)}
      />
    </div>

    <div class="input-wrapper">
      Width(px):
      <input
        type="number"
        bind:value={width}
        min="1"
        on:focus={(event) => selectAll(event)}
      />
    </div>

    <div class="input-wrapper">
      Height(px):
      <input
        type="number"
        bind:value={height}
        min="1"
        on:focus={(event) => selectAll(event)}
      />
    </div>

    <div class="input-wrapper">
      Width(mm):
      <input
        type="number"
        bind:value={widthMM}
        min="1"
        on:focus={(event) => selectAll(event)}
      />
    </div>

    <div class="input-wrapper">
      Height(mm):
      <input
        type="number"
        bind:value={heightMM}
        min="1"
        on:focus={(event) => selectAll(event)}
      />
    </div>
  </div>
  <div class="submit-wrapper">
    <button on:click={addScreen}>Submit</button>
  </div>
</div>

<style>
  .loose {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #ffffff;
    align-self: center;
    width: 100%;
  }
  .title {
    display: flex;
    justify-content: center;
  }
  input {
    font-size: 1.2em;
  }

  .submit-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .submit-wrapper > button {
    padding: 10px;
    padding-inline: 40px;
  }
  button {
    margin-inline: auto;
  }
  .input-wrapper {
    color: white;
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
