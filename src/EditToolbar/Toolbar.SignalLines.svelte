<script lang="ts">
  import { fade } from "svelte/transition";
  import { screens, currentScreenIndex } from "../store";
  import ColorPicker from "./components/ColorPicker.svelte";

  const removeLine = () => {
    const screen = $screens[$currentScreenIndex];
    screen.signalLines.array.forEach((line, i) => {
      if (line.isSelected) {
        screen.signalLines.removeSignalLine(line);
      }
    });

    $screens = $screens;
    // need to call panels update here to
    // trigger redraw, cannott use signal lines
    // because of the way the draw updates
    // $panelsClass = $panelsClass;
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
    <input
      type="checkbox"
      bind:checked={$screens[$currentScreenIndex].showDirectionArrows}
    />
    Show Direction Arrows
  </div>

  {#if isLineOpen}
    <ColorPicker
      key={"signalLine"}
      layer={"background"}
      element={"Signal Lines"}
      isOpen={true}
      classObj={$screens[$currentScreenIndex].signalLines}
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
