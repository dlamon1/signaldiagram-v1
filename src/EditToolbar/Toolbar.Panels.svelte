<script lang="ts">
  import { fade } from "svelte/transition";

  import { showCoordinates, isRearView, opacity } from "../store";

  import {
    panels,
    updateScreens,
    snapPoints,
    screens,
    currentScreenIndex,
  } from "../store";
  import type { PanelObj, SnapPointObj } from "../Types/ClassTypes";

  import ColorPicker from "./components/ColorPicker.svelte";
  import SignalButtons from "./components/SignalButtons.svelte";

  const selectCriss = () => {
    let panels = $screens[$currentScreenIndex].panels;
    panels.array.forEach((p) => {
      p.setIsSelected(false);
      if (p.colorIndex == 0) {
        p.setIsSelected(true);
      }
      updateScreens();
    });
  };

  const selectCross = () => {
    let panels = $screens[$currentScreenIndex].panels;
    panels.array.forEach((p) => {
      p.setIsSelected(false);
      if (p.colorIndex == 1) {
        p.setIsSelected(true);
      }
      updateScreens();
    });
  };

  const updateLineWidth = (e: Event) => {
    // let panels = $screens[$currentScreenIndex].panels;
    // const target = e.target as HTMLInputElement;
    // panels.array.forEach((panel) => {
    //   if (panel.isSelected) {
    //     panel.setLineWidthMultiplier(target.value);
    //   }
    // });
  };

  const hideSnapPoints = (snapPointArray: number[], isHidden: boolean) => {
    snapPointArray.forEach((snapPointIndex) => {
      $snapPoints.array[snapPointIndex].setIsHidden(isHidden);
    });
    $snapPoints = $snapPoints;
  };

  const hide = (isHidden: boolean) => {
    $panels?.array.forEach((p: PanelObj) => {
      if (p.isSelected) {
        hideSnapPoints(p.thisPanelsSnapPoints, isHidden);
        p.setIsHidden(isHidden);
      }
    });
    $panels = $panels;
  };

  $: hide(!isVisible);

  let isVisible = true;

  const setIsVisible = () => {
    if (typeof $currentScreenIndex != "number") {
      return;
    }

    isVisible = true;

    let panels = $screens[$currentScreenIndex].panels;

    panels.array.forEach((p) => {
      if (p.isSelected) {
        isVisible = !p.isHidden;
      }
    });
  };

  $: {
    let t = [$screens];

    setIsVisible();
  }
</script>

<div id="panels" in:fade={{ duration: 150 }} out:fade={{ duration: 0 }}>
  {#if typeof $currentScreenIndex === "number"}
    <div class="crisscross">
      <button class="criss-cross" on:click={selectCriss}>Select [0]</button>
      <button class="criss-cross" on:click={selectCross}>select [1]</button>
    </div>

    <div class="hide">
      <label>
        <input
          type="checkbox"
          bind:checked={isVisible}
          name="mode"
          value="draw"
        />
        Visible
      </label>
    </div>

    <!-- <input
    type="range"
    min="0"
    max="10"
    step=".01"
    bind:value={$lineWidthState}
    on:input={(e) => updateLineWidth(e)}
    class="range"
    /> -->

    <ColorPicker
      key={"panel"}
      layer="background"
      element={"Background"}
      isOpen={true}
      classObj={$screens[$currentScreenIndex].panels}
    />
    <ColorPicker
      key={"panel"}
      layer="border"
      element={"Border"}
      isOpen={false}
      classObj={$screens[$currentScreenIndex].panels}
    />
    <ColorPicker
      key={"panel"}
      layer={"font"}
      element={"Font"}
      isOpen={false}
      classObj={$screens[$currentScreenIndex].panels}
    />

    <SignalButtons />
  {/if}
</div>

<style>
  .hide {
    width: 100%;
    display: flex;
    margin-top: 10px;
  }
  .criss-cross {
    padding: 5px;
    padding-inline: 15px;
  }

  .crisscross {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
  }

  #panels {
    position: absolute;
    flex: 1;
    width: 100%;
  }
</style>
