<script>
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

<div
  id="panels"
  in:fade={{ x: 100, duration: 150 }}
  out:fade={{ x: 0, duration: 0 }}
>
  <div class="crisscross">
    <button class="criss-cross" on:click={selectCriss}>Select [0]</button>
    <button class="criss-cross" on:click={selectCross}>select [1]</button>
  </div>

  <ColorPicker
    key={"panel"}
    layer={"background"}
    element={"Background"}
    isOpen={true}
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
  .title {
    font-size: 1.2em;
    font-weight: bold;
  }
  #panels {
    position: absolute;
    flex: 1;
    width: 100%;
  }
</style>
