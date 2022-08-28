<script lang="ts">
  import { fade } from "svelte/transition";

  import { panels, updatePanels } from "../store";

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
</script>

<div id="panels" in:fade={{ duration: 150 }} out:fade={{ duration: 0 }}>
  <div class="crisscross">
    <button class="criss-cross" on:click={selectCriss}>Select [0]</button>
    <button class="criss-cross" on:click={selectCross}>select [1]</button>
  </div>

  <ColorPicker
    key={"panel"}
    layer="background"
    element={"Background"}
    isOpen={true}
  />
  <ColorPicker
    key={"panel"}
    layer="border"
    element={"Border"}
    isOpen={false}
  />
  <ColorPicker
    key={"panel"}
    layer={"font"}
    element={"Font"}
    isOpen={false}
  />
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
