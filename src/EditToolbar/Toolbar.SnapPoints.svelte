<script lang="ts">
  import {
    textInputRef,
    snapPointLabel,
    selectedSnapPointIndexes,
    screens,
    currentScreenIndex,
  } from "../store";

  import SnapPointOptions from "../InfoToolbar/InfoBar.SnapPointOptions.svelte";

  import { fade } from "svelte/transition";

  import ColorPicker from "./components/ColorPicker.svelte";
  import type { SnapPointObj } from "../Types/ClassTypes";

  const selectOnes = () => {
    $screens[$currentScreenIndex].snapPoints.array.forEach(
      (p: SnapPointObj) => {
        p.setIsSelected(false);
        if (p.pointIndexWithinPanel == 1) {
          p.setIsSelected(true);
        }
        $screens = $screens;
      }
    );
  };

  $: {
    let t = [$selectedSnapPointIndexes];

    updateOffsetValues();
  }

  const updateOffsetValues = () => {
    xOffset = 0;
    yOffset = 0;

    $screens[$currentScreenIndex].snapPoints.array.forEach(
      (sp: SnapPointObj) => {
        if (sp.isSelected) {
          xOffset = sp.xOffset;
          yOffset = -sp.yOffset;
        }
      }
    );
  };

  const selectTwos = () => {
    $screens[$currentScreenIndex].snapPoints.array.forEach(
      (p: SnapPointObj) => {
        p.setIsSelected(false);
        if (p.pointIndexWithinPanel == 2) {
          p.setIsSelected(true);
        }
        $screens = $screens;
      }
    );
  };

  let sd = [];

  let xOffset = 0;
  let yOffset = 0;

  $: {
    setOffsets(xOffset, -yOffset);
  }

  const setOffsets = (x: number, y: number) => {
    $screens[$currentScreenIndex].snapPoints.setXOffsets(x);
    $screens[$currentScreenIndex].snapPoints.setYOffsets(y);

    $screens = $screens;
  };

  $: {
    sd = [];

    $screens[$currentScreenIndex].snapPoints.array?.forEach((p) => {
      if ((p.isSquare && p.isSelected) || (p.isTriangle && p.isSelected)) {
        sd.push(p);
      }
    });
  }

  const handleRemoveLabel = () => {
    $screens[$currentScreenIndex].snapPoints.array.forEach((snapPoint) => {
      if (snapPoint.isSelected) {
        $screens[$currentScreenIndex].snapPoints.removeLabel();
      }
    });
    $screens = $screens;
  };
</script>

<div id="snappoints" in:fade={{ duration: 150 }} out:fade={{ duration: 0 }}>
  <div class="crisscross">
    <button class="criss-cross" on:click={selectOnes}>Select [0]</button>
    <button class="criss-cross" on:click={selectTwos}>select [1]</button>
  </div>

  <div class="divider" />

  <div id="general">
    <SnapPointOptions />
  </div>

  {#if sd.length}
    <div class="divider" />

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

    <div class="divider" />

    <ColorPicker
      key={"snapPoint"}
      layer={"background"}
      element={"Background"}
      isOpen={false}
      classObj={$screens[$currentScreenIndex].snapPoints}
    />

    <div class="divider" />

    <ColorPicker
      key={"snapPoint"}
      layer={"font"}
      element={"Font"}
      isOpen={false}
      classObj={$screens[$currentScreenIndex].snapPoints}
    />

    <div class="divider" />

    <div id="input-wrapper" class="opacity-wrapper" style="margin-top: 10px;">
      <label class="hovered">
        X Offset
        <input
          type="range"
          min={-$screens[$currentScreenIndex].width / 3}
          max={$screens[$currentScreenIndex].width / 3}
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
          min={-$screens[$currentScreenIndex].height / 3}
          max={$screens[$currentScreenIndex].height / 3}
          step="1"
          bind:value={yOffset}
          class="range"
        />
      </label>
    </div>
  {/if}

  <div class="divider" />

  <div class="shape-button-container">
    <button
      id="shape-button"
      on:click={() =>
        $screens[$currentScreenIndex].snapPoints.setIsSquares(true)}
      >Square</button
    >

    <button
      id="shape-button"
      on:click={() =>
        $screens[$currentScreenIndex].snapPoints.setIsTriangles(true)}
      >Triangle</button
    >
  </div>

  {#if sd.length}
    <div id="delete-button" transition:fade={{ duration: 300 }}>
      <button on:click={handleRemoveLabel}>Remove Label</button>
    </div>
  {/if}
</div>

<div class="margin" />

<style>
  .margin {
    height: 20px;
  }

  .crisscross {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
  }

  .criss-cross {
    padding: 5px;
    padding-inline: 15px;
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
    /* justify-content: center; */
    width: 100%;
  }

  #snappoints {
    position: absolute;
    flex: 1;
    width: 100%;
  }
</style>
