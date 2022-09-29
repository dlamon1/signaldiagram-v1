<script lang="ts">
  import { currentScreenIndex, screens } from "../../store";

  const save = async () => {
    let saveObj = {
      screens: $screens,
    };

    let panelsJSON = JSON.stringify(saveObj);

    function download() {
      const a = document.createElement("a");
      const file = new Blob([panelsJSON], { type: "application/json" });
      a.href = URL.createObjectURL(file);
      a.download = "LED_SIGNAL_SESSION.json";
      a.click();
    }

    download();
  };
</script>

<svg id="print" width="0" height="0" />

<button
  on:click={save}
  class="save"
  disabled={typeof $currentScreenIndex != "number"}>Save</button
>

<style>
  button {
    height: 40px;
    width: 175px;
    transition: background-color 0.1s, color 0.1s;
    font-size: 1em;
    font-weight: 700;
  }
  button:hover {
    background-color: rgb(79, 79, 79);
    color: rgb(255, 255, 255);
  }

  .save {
    margin-top: 10px;
  }
</style>
