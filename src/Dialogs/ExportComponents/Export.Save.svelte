<script>
  import {
    panels,
    snapPointsQuantity,
    snapPointDirection,
    title,
    rows,
    columns,
    isRearView,
    width,
    height,
    toolbarWidth,
    snapPoints,
    signalLines,
  } from "../../store";

  const save = async () => {
    let saveObj = {
      rows: $rows,
      columns: $columns,
      title: $title,
      toolbarWidth: $toolbarWidth,
      isRearView: $isRearView,
      snapPointsQuantity: $snapPointsQuantity,
      snapPointDirection: $snapPointDirection,
      columns: $columns,
      rows: $rows,
      width: $width,
      height: $height,
      panels: $panels,
      snapPoints: $snapPoints,
      signalLines: $signalLines,
    };

    let panelsJson = JSON.stringify(saveObj);

    function download() {
      const a = document.createElement("a");
      const file = new Blob([panelsJson], { type: "application/json" });
      a.href = URL.createObjectURL(file);
      a.download = "test" + ".json";
      a.click();
    }

    download();
  };
</script>

<svg id="print" width="0" height="0" />

<button on:click={save} class="save">Save</button>

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
