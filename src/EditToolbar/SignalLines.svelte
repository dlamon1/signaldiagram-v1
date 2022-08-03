<script>
  import { fly, fade } from "svelte/transition";
  import {
    selectedSignalLines,
    signalLines,
    showDirectionArrows,
    colorState,
    colorButtons,
  } from "../store";
  import ColorPicker from "./components/ColorPicker.svelte";

  const removeLine = () => {
    $selectedSignalLines.forEach((line) => {
      $signalLines.removeSignalLine(line);
    });

    $selectedSignalLines = [];
    $selectedSignalLines = $selectedSignalLines;
    $signalLines = $signalLines;
  };

  const updateLocalLabelAndColorState = () => {
    if ($selectedSignalLines.length > 1) return;
    $selectedSignalLines.forEach((line, i) => {
      $colorState.signalLine.background = line.backgroundColor;
    });
  };

  $: {
    let triggers = {
      $selectedSignalLines,
    };
    updateLocalLabelAndColorState();
  }

  let isLineOpen = true;
</script>

<div
  id="signallines"
  in:fade={{ x: 100, duration: 150 }}
  out:fade={{ x: 0, duration: 40 }}
>
  <div class="title">Signal Lines</div>

  <div class="input-wrapper">
    <input type="checkbox" bind:checked={$showDirectionArrows} />
    Show Direction Arrows
  </div>

  <div class="subtitle" on:click={() => (isLineOpen = !isLineOpen)}>
    Line {isLineOpen ? "▼" : "▲"}
  </div>

  {#if isLineOpen}
    <ColorPicker key={"signalLine"} layer={"background"} />
  {/if}
  <div class="remove-lines-container">
    <button on:click={removeLine}>Remove Lines</button>
  </div>
</div>

<style>
  .input-wrapper {
    margin-top: 10px;
  }
  .remove-lines-container button {
    padding: 5px;
  }
  .remove-lines-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .title {
    font-size: 1.2em;
    font-weight: bold;
  }
  .subtitle {
    margin-top: 10px;
  }
  #signallines {
    position: absolute;
    flex: 1;
    width: 100%;
  }
</style>
