<script lang="ts">
  import {
    textInputRef,
    snapPointLabel,
    snapPoints as snapPointsClass,
    width,
    height,
  } from "../store";
  import { fade } from "svelte/transition";

  import ColorPicker from "./components/ColorPicker.svelte";
  import type { SnapPointObj } from "../Types/ClassTypes";

  const selectOnes = () => {
    $snapPointsClass.array.forEach((p: SnapPointObj) => {
      p.setIsSelected(false);
      if (p.pointIndexWithinPanel == 1) {
        p.setIsSelected(true);
      }
      $snapPointsClass = $snapPointsClass;
    });
  };

  const selectTwos = () => {
    $snapPointsClass.array.forEach((p: SnapPointObj) => {
      p.setIsSelected(false);
      if (p.pointIndexWithinPanel == 2) {
        p.setIsSelected(true);
      }
      $snapPointsClass = $snapPointsClass;
    });
  };

  let sd = [];

  let xOffset = 0;
  let yOffset = 0;

  $: {
    setOffsets(xOffset, -yOffset);
  }

  const setOffsets = (x: number, y: number) => {
    $snapPointsClass.setXOffsets(x);
    $snapPointsClass.setYOffsets(y);

    $snapPointsClass = $snapPointsClass;
  };

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
        $snapPointsClass.removeLabel();
      }
    });
    $snapPointsClass = $snapPointsClass;
  };
</script>

<div id="snappoints" in:fade={{ duration: 150 }} out:fade={{ duration: 0 }}>
  <div class="crisscross">
    <button class="select" on:click={selectOnes}>Select [0]</button>
    <button class="select" on:click={selectTwos}>select [1]</button>
  </div>

  <div id="input-wrapper" class="opacity-wrapper" style="margin-top: 10px;">
    <label class="hovered">
      X Offset
      <input
        type="range"
        min={-$width / 3}
        max={$width / 3}
        step="1"
        bind:value={xOffset}
        class="range"
      />
    </label>
  </div>

  <div id="input-wrapper" class="opacity-wrapper">
    <label class="hovered">
      Y Offset
      <input
        type="range"
        min={-$height / 3}
        max={$height / 3}
        step="1"
        bind:value={yOffset}
        class="range"
      />
    </label>
  </div>

  <div class="shape-button-container">
    <button
      id="shape-button"
      on:click={() => $snapPointsClass.setIsSquares(true)}>Square</button
    >

    <button
      id="shape-button"
      on:click={() => $snapPointsClass.setIsTriangles(true)}>Triangle</button
    >
  </div>

  {#if sd.length}
    <ColorPicker
      key={"snapPoint"}
      layer={"background"}
      element={"Background"}
      isOpen={false}
      classObj={$snapPointsClass}
    />

    <ColorPicker
      key={"snapPoint"}
      layer={"font"}
      element={"Font"}
      isOpen={false}
      classObj={$snapPointsClass}
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

    <div id="delete-button" transition:fade={{ duration: 300 }}>
      <button on:click={handleRemoveLabel}>Remove Label</button>
    </div>
  {/if}
</div>

<style>
  .select > button {
    padding: 5px;
    padding-inline: 15px;
  }

  .crisscross {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
  }

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
