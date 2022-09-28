<script lang="ts">
  import { onMount, tick } from "svelte";
  import {
    panels,
    snapPointsQuantity,
    snapPointDirection,
    title,
    isRearView,
    width,
    height,
    snapPoints,
    signalLines,
    isExportDialogOpen,
  } from "../../store";

  onMount(() => {
    (function () {
      function onChange(event) {
        let reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
      }

      async function onReaderLoad(event) {
        var obj = JSON.parse(event.target.result);

        $width = obj.width;
        $height = obj.height;
        // $rows = obj.rows;
        // $columns = obj.columns;

        await tick();

        $title = obj.title;
        $title = $title;

        $isRearView = obj.isRearView;

        $snapPointsQuantity = obj.snapPointsQuantity;
        $snapPointDirection = obj.snapPointDirection;

        $panels.setArrayFromLoad(obj.panels.array);
        $snapPoints.setArrayFromLoad(obj.snapPoints.array);
        $signalLines.setArrayFromLoad(obj.signalLines.array);

        $isExportDialogOpen = false;

        await tick();

        $panels = $panels;
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
