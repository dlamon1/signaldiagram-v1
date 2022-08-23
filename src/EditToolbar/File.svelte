<script>
  import { Canvg, presets } from "canvg";
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

  // const download = async () => {
  //   $panels.deSelect();
  //   $signalLines.deSelect();
  //   $snapPoints.deSelect();

  //   await tick();

  //   var svg = document.getElementById("g-zoom-wrapper");

  //   let cloned = svg.cloneNode(true);

  //   cloned.style.transform = "translate(0,0) scale(1)";

  //   var tmp = document.createElement("div");
  //   tmp.appendChild(cloned);

  //   let clonedString = tmp.innerHTML;

  //   // newE(clonedString);

  //   var canvas = document.createElement("canvas");
  //   var ctx = canvas.getContext("2d");

  //   const v = Canvg.fromString(ctx, clonedString);
  //   v.render();

  //   var base64 = canvas.toDataURL("image/png");
  //   generateLink("SVG2PNG-01.png", base64).click();
  // };

  // async function newE(svg) {
  //   const preset = presets.offscreen();

  //   async function toPng(data) {
  //     // const { width, height, svg } = data;
  //     const canvas = new OffscreenCanvas(1920, 1080);
  //     const ctx = canvas.getContext("2d");
  //     const v = Canvg.fromString(ctx, svg);

  //     await v.render();

  //     const blob = await canvas.convertToBlob();

  //     console.log(blob);

  //     const pngUrl = URL.createObjectURL(blob);

  //     console.log(pngUrl);
  //     return pngUrl;
  //   }

  //   toPng().then((pngUrl) => {
  //     const img = document.querySelector("img");

  //     img.src = pngUrl;
  //   });
  // }

  function generateLink(fileName, data) {
    var link = document.createElement("a");
    link.download = fileName;
    link.href = data;
    link.remove();
    return link;
  }

  let inputRef;

  const download = async () => {
    var svg = document.getElementById("g-zoom-wrapper");

    if (typeof window.XMLSerializer != "undefined") {
      var svgData = new XMLSerializer().serializeToString(svg);
    } else if (typeof svg.xml != "undefined") {
      var svgData = svg.xml;
    }

    var canvas = document.createElement("canvas");
    var svgSize = svg.getBoundingClientRect();

    console.log(svgSize);

    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    var ctx = canvas.getContext("2d");

    var img = document.createElement("img");
    console.log(img);
    img.setAttribute(
      "src",
      "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
    );
    console.log(img);

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      console.log(ctx);
      var imgsrc = canvas.toDataURL("image/png");

      var a = document.createElement("a");
      a.download = "asdf.png";
      a.href = imgsrc;
      document.appendChild(a);
      a.click();
    };
  };

  onMount(() => inputRef.focus());
</script>

<div class="title">
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
