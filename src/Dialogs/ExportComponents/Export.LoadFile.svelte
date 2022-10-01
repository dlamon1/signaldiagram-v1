<script lang="ts">
  import { onMount, tick } from "svelte";
  import { Screen } from "../../classes/ScreenClass";
  import { screens, isExportDialogOpen, currentScreenIndex } from "../../store";

  onMount(() => {
    (function () {
      function onChange(event) {
        let reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
      }

      async function onReaderLoad(event) {
        var obj = JSON.parse(event.target.result);

        obj.screens.forEach(async (s) => {
          let newScreen = new Screen(
            s.columns,
            s.rows,
            s.width,
            s.height,
            s.widthMM,
            s.heightMM,
            s.name
          );

          $screens.push(newScreen);

          $screens = $screens;

          await tick();

          newScreen.load(s);

          $screens = $screens;

          $isExportDialogOpen = !$isExportDialogOpen;

          await tick();

          $currentScreenIndex = 0;
        });
      }

      document.getElementById("file").addEventListener("change", onChange);
    })();
  });
</script>

<div>
  <div class="box__input">
    <input type="file" id="file" class="inputfile" accept="application/JSON" />
    <label for="file"><div>Load</div> </label>
  </div>
</div>

<style>
  .inputfile + label {
    margin-top: 10px;
    width: 165px;
    height: 40px;
    font-size: 1em;
    font-weight: 700;
    color: black;
    background-color: rgb(239, 239, 239);
    display: inline-block;
    cursor: pointer;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inputfile:focus + label,
  .inputfile + label:hover {
    background-color: rgb(79, 79, 79);
    color: rgb(255, 255, 255);
  }
  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
</style>
