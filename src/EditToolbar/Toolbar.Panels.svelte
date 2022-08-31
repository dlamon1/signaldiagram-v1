<script lang="ts">
  import { fade } from "svelte/transition";

  import { panels, updatePanels, snapPoints } from "../store";
  import type { PanelObj, SnapPointObj } from "../Types/ClassTypes";

  import ColorPicker from "./components/ColorPicker.svelte";

  const selectCriss = () => {
    $panels.array.forEach((p) => {
      p.setIsSelected(false);
      if (p.colorIndex == 0) {
        p.setIsSelected(true);
      }
      updatePanels();
    });
  };

  const selectCross = () => {
    $panels.array.forEach((p) => {
      p.setIsSelected(false);
      if (p.colorIndex == 1) {
        p.setIsSelected(true);
      }
      updatePanels();
    });
  };

  const updateLineWidth = (e: Event) => {
    const target = e.target as HTMLInputElement;
    $panels.array.forEach((panel) => {
      if (panel.isSelected) {
        panel.setLineWidthMultiplier(target.value);
      }
    });
    $panels = $panels;
  };

  const hideSnapPoints = (snapPointArray: number[]) => {
    snapPointArray.forEach((snapPointIndex) => {
      $snapPoints.array[snapPointIndex].setIsHidden(true);
    });
    $snapPoints = $snapPoints;
  };

  const hide = () => {
    $panels.array.forEach((p: PanelObj) => {
      if (p.isSelected) {
        hideSnapPoints(p.thisPanelsSnapPoints);
        p.setIsHidden(true);
      }
    });
    $panels = $panels;
  };
</script>

<div id="panels" in:fade={{ duration: 150 }} out:fade={{ duration: 0 }}>
  <div class="crisscross">
    <button class="criss-cross" on:click={selectCriss}>Select [0]</button>
    <button class="criss-cross" on:click={selectCross}>select [1]</button>
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
    classObj={$panels}
  />
  <ColorPicker
    key={"panel"}
    layer="border"
    element={"Border"}
    isOpen={false}
    classObj={$panels}
  />
  <ColorPicker
    key={"panel"}
    layer={"font"}
    element={"Font"}
    isOpen={false}
    classObj={$panels}
  />

  <button class="" on:click={hide}>Hide</button>
</div>

<style>
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
