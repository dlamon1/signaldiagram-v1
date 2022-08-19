<script>
  import { onMount, tick } from "svelte";
  import Load from "./components/LoadFile.svelte";
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
    selectedSignalLines,
    squares,
    circles,
    selectedSquares,
    toolbarWidth,
    snapPoints,
    signalLines,
    labels,
    clearAllSelections,
    isPrinting,
  } from "../store";

  // const download = async () => {
  //   clearAllSelections();

  //   await tick();

  //   // trigger resize function in Panels.svelte
  //   $isPrinting = true;
  // };

  // const save = async () => {
  //   let saveObj = {
  //     rows: $rows,
  //     columns: $columns,
  //     title: $title,
  //     toolbarWidth: $toolbarWidth,
  //     isRearView: $isRearView,
  //     snapPointsQuantity: $snapPointsQuantity,
  //     snapPointDirection: $snapPointDirection,
  //     columns: $columns,
  //     rows: $rows,
  //     width: $width,
  //     height: $height,
  //     panels: $panels,
  //     snapPoints: $snapPoints,
  //     signalLines: $signalLines,
  //     labels: $labels,
  //     squares: $squares,
  //     circles: $circles,
  //   };

  //   let panelsJson = JSON.stringify(saveObj);

  //   function download() {
  //     const a = document.createElement("a");
  //     const file = new Blob([panelsJson], { type: "text/plain" });
  //     a.href = URL.createObjectURL(file);
  //     a.download = $title + ".json";
  //     a.click();
  //   }

  //   download();
  // };

  // const reset = () => {
  //   $panels.forEach((p) => {
  //     p.backgroundColor = p.color;
  //     p.hasSquare = false;
  //   });
  //   panels.update((p) => $panels);
  // };

  function download() {
    let img = new Image();
    let serializer = new XMLSerializer();
    let element = document.getElementById("g-zoom-wrapper");
    let svgStr = serializer.serializeToString(element);

    console.log(element);

    img.src = "data:image/svg+xml;utf8," + svgStr;

    console.log(img);
    // You could also use the actual string without base64 encoding it:
    //img.src = "data:image/svg+xml;utf8," + svgStr;

    var canvas = document.createElement("canvas");

    var w = 800;
    var h = 400;

    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d").drawImage(img, 0, 0, w, h);

    var imgURL = canvas.toDataURL("image/png");

    var dlLink = document.createElement("a");
    dlLink.download = "image";
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [
      "image/png",
      dlLink.download,
      dlLink.href,
    ].join(":");

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
  }

  let inputRef;
  onMount(() => inputRef.focus());
</script>

<div class="title">
  <!-- <div>Title:</div> -->
  <input
    type="text"
    bind:value={$title}
    bind:this={inputRef}
    placeholder="Filename"
  />
</div>
<button on:click={download} class="download">Download .PNG</button>

<!-- <button on:click={save} class="save">Save</button> -->

<Load />

<style>
  .title input {
    margin-top: 5px;
    width: 165px;
    font-size: 1.15em;
  }
  .title div {
    color: white;
    font-size: 1.25em;
  }
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
  .download {
    margin-top: 10px;
    margin-bottom: 0px;
  }
</style>
