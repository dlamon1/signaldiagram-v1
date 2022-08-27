<script lang="ts">
  import { fade } from "svelte/transition";
  import {
    signalLines as signalLinesClass,
    panels as panelsClass,
    showDirectionArrows,
    colorState,
    colorButtons,
  } from "../store";
  import ColorPicker from "./components/ColorPicker.svelte";

  const removeLine = () => {
    $signalLinesClass.array.forEach((line, i) => {
      if (line.isSelected) {
        $signalLinesClass.removeSignalLine(line);
      }
    });

    $signalLinesClass = $signalLinesClass;
    // need to call panels update here to
    // trigger redraw, cannott use signal lines
    // because of the way the draw updates
    $panelsClass = $panelsClass;
  };

  const updateLocalLabelAndColorState = () => {
    // if ($selectedSignalLines.length > 1) return;
    // $selectedSignalLines.forEach((line, i) => {
    //   $colorState.signalLine.background = line.backgroundColor;
    // });
  };

  $: {
    let triggers = {
      // $selectedSignalLines,
    };
    updateLocalLabelAndColorState();
  }

  let isLineOpen = true;
</script>

<div id="signallines" in:fade={{ duration: 150 }} out:fade={{ duration: 40 }}>
  <div class="input-wrapper">
    <input type="checkbox" bind:checked={$showDirectionArrows} />
    Show Direction Arrows
  </div>

  {#if isLineOpen}
    <ColorPicker
      key={"signalLine"}
      layer={"background"}
      element={"Signal Lines"}
      isOpen={true}
    />
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
  #signallines {
    position: absolute;
    flex: 1;
    width: 100%;
  }
</style>
