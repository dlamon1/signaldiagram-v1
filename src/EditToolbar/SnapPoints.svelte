<script>
  import { onMount } from "svelte";
  import {
    selectionTab,
    colorButtons,
    textInputRef,
    selectedSquares,
    squares,
    selectedSnapPoints,
    selectedPanels,
    selectedSignalLines,
    snapPointLabel,
    colorState,
  } from "../store";
  import { fly } from "svelte/transition";
  import { focusLabelInput } from "../functions/focusInput";

  import ColorPicker from "./components/ColorPicker.svelte";

  let isSnapPointsSelected = false;

  $: {
    if ($selectedSquares.length > 0) {
      isSnapPointsSelected = true;
    } else {
      isSnapPointsSelected = false;
    }
  }

  let toggleSquarex = () => {
    let a = [];
    $selectedSnapPoints.forEach((point, i) => {
      $squares[point.i].isOn = true;
      a.push($squares[point.i]);
    });
    $squares = [...$squares];
    $selectedSquares = [...a];
    focusLabelInput();
  };

  const deleteSelectedSquares = () => {
    $selectedSquares.forEach((s) => {
      $squares[s.i].isOn = false;
    });
    $selectedSquares = [];
    $selectedSquares = $selectedSquares;
    $squares = $squares;
  };

  const updateLocalLabelAndColorState = () => {
    if ($selectedSquares.length > 1) return;
    $selectedSquares.forEach((squares, i) => {
      $snapPointLabel = squares.label;
      $colorState.snapPoint.background = squares.backgroundColor;
      $colorState.snapPoint.outline = squares.outlineColor;
      $colorState.snapPoint.font = squares.fontColor;
    });
  };

  $: {
    let triggers = {
      $selectedPanels,
      $selectedSnapPoints,
      $selectedSignalLines,
    };
    updateLocalLabelAndColorState();
  }

  let isBackgroundOpen = true;
  let isFontOpen = false;
</script>

<div
  id="snappoints"
  in:fly={{ x: 100, duration: 120 }}
  out:fly={{ x: 0, duration: 120 }}
>
  <div class="title">Snap Points</div>

  <div class="shape-button-container">
    <button id="shape-button" on:click={toggleSquarex}>Add Square</button>
  </div>
  {#if isSnapPointsSelected}
    <div id="label-input">
      Label:{" "}

      <input
        maxlength="3"
        bind:this={$textInputRef}
        type="text"
        bind:value={$snapPointLabel}
      />
    </div>

    <div
      class="subtitle"
      on:click={() => (isBackgroundOpen = !isBackgroundOpen)}
    >
      Background {isBackgroundOpen ? "▼" : "▲"}
    </div>
    {#if isBackgroundOpen}
      <ColorPicker key={"snapPoint"} layer={"background"} />
    {/if}

    <div class="subtitle" on:click={() => (isFontOpen = !isFontOpen)}>
      Font {isFontOpen ? "▼" : "▲"}
    </div>

    {#if isFontOpen}
      <ColorPicker key={"snapPoint"} layer={"font"} />
    {/if}

    <div id="delete-button" transition:fly={{ y: -10, duration: 300 }}>
      <button on:click={deleteSelectedSquares}>Remove Square</button>
    </div>
  {/if}
</div>

<style>
  .shape-button-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .title {
    font-size: 1.2em;
    font-weight: bold;
  }
  .subtitle {
    margin-top: 10px;
  }

  #delete-button {
    display: flex;
    justify-content: center;
    width: 100%;
    align-self: center;
    margin-top: 10px;
  }
  #shape-button {
    width: 100px;
    height: 30px;
    margin-top: 10px;
    align-self: center;
  }

  #label-input {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  #snappoints {
    position: absolute;
    flex: 1;
    width: 100%;
  }
</style>
