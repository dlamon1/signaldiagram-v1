<script>
  import { onMount } from "svelte";
  import {
    colorButtons,
    textInputRef,
    selectedSquares,
    squares,
    selectedPanels as selectedPanelsClass,
    selectedSignalLines,
    snapPointLabel,
    colorState,
    snapPoints as snapPointsClass,
  } from "../store";
  import { fade, fly } from "svelte/transition";
  import { focusLabelInput } from "../functions/focusInput";

  import ColorPicker from "./components/ColorPicker.svelte";

  let sd = [];

  $: {
    sd = [];

    $snapPointsClass.array?.forEach((p) => {
      if ((p.isSquare && p.isSelected) || (p.isTriangle && p.isSelected)) {
        sd.push(p);
      }
    });
  }

  const handleRemoveLabel = () => {
    $snapPointsClass.array.forEach((snapPoint) => {
      if (snapPoint.isSelected) {
        $snapPointsClass.removeLabel(snapPoint);
      }
    });
    $snapPointsClass = $snapPointsClass;
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

  // $: {
  //   let triggers = {
  //     $selectedPanelsClass,
  //     $selectedSignalLines,
  //   };
  //   updateLocalLabelAndColorState();
  // }
</script>

<div
  id="snappoints"
  in:fade={{ x: 100, duration: 150 }}
  out:fade={{ x: 0, duration: 0 }}
>
  <div class="shape-button-container">
    <button id="shape-button" on:click={$snapPointsClass.setIsSquares(true)}
      >Square</button
    >
    <!-- </div> -->

    <!-- <div class="shape-button-container"> -->
    <button id="shape-button" on:click={$snapPointsClass.setIsTriangles(true)}
      >Triangle</button
    >
  </div>

  {#if sd.length}
    <ColorPicker
      key={"snapPoint"}
      layer={"background"}
      element={"Background"}
      isOpen={true}
    />

    <ColorPicker
      key={"snapPoint"}
      layer={"font"}
      element={"Font"}
      isOpen={false}
    />
    <div id="label-input">
      <div class="label-input-header">
        Text:{" "}
      </div>

      <input
        class="label-text-input"
        maxlength="3"
        bind:this={$textInputRef}
        type="text"
        bind:value={$snapPointLabel}
      />
    </div>

    <div id="delete-button" transition:fade={{ y: -10, duration: 300 }}>
      <button on:click={handleRemoveLabel}>Remove Label</button>
    </div>
  {/if}
</div>

<style>
  .label-text-input {
    width: 50px;
  }
  .shape-button-container {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  .label-input-header {
    margin-right: 10px;
  }

  .title {
    font-size: 1.2em;
    font-weight: bold;
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
