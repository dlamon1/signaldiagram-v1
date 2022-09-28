<script lang="ts">
  import { tick } from "svelte";
  import { saveAs } from "file-saver";

  import * as d3 from "d3";

  import { title, mode, screens, currentScreenIndex } from "../../store";

  const download = async () => {
    // $panels.deSelect();
    // $signalLines.deSelect();
    // $snapPoints.deSelect();
    $mode = "select";

    await tick();

    let zoom = d3.zoom().on("zoom", handleZoom);

    let clonedZoomWrapper;

    function handleZoom(e) {
      clonedZoomWrapper.attr("transform", e.transform);
    }

    let w =
      $screens[$currentScreenIndex].width *
      $screens[$currentScreenIndex].columns;
    let h =
      $screens[$currentScreenIndex].height * $screens[$currentScreenIndex].rows;

    let svg = d3.select("#svg");
    let g = svg.select("g").clone(true).node();
    let p = d3.select("#print");

    p.attr("width", w);
    p.attr("height", h);

    p.append(() => g);
    clonedZoomWrapper = p.select("g");

    d3.select("#print").call(
      zoom.transform as any,
      d3.zoomIdentity.scale(1).translate(0, 0)
    );

    var svgString = getSVGString(p.node());
    p.attr("width", 0);
    p.attr("height", 0);

    svgString2Image(svgString, 2 * w, 2 * h, "png", save); // passes Blob and filesize String to the callback

    function save(dataBlob, filesize) {
      console.log(dataBlob);
      saveAs(dataBlob, $title + ".png"); // FileSaver.js function
    }

    // Below are the functions that handle actual exporting:
    // getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
    function getSVGString(svgNode) {
      svgNode.setAttribute("xlink", "http://www.w3.org/1999/xlink");
      var cssStyleText = getCSSStyles(svgNode);
      appendCSS(cssStyleText, svgNode);

      var serializer = new XMLSerializer();
      var svgString = serializer.serializeToString(svgNode);
      svgString = svgString.replace(/(\w+)?:?xlink=/g, "xmlns:xlink="); // Fix root xlink without namespace
      svgString = svgString.replace(/NS\d+:href/g, "xlink:href"); // Safari NS namespace fix

      return svgString;

      function getCSSStyles(parentElement) {
        var selectorTextArr = [];

        // Add Parent element Id and Classes to the list
        selectorTextArr.push("#" + parentElement.id);
        for (var c = 0; c < parentElement.classList.length; c++)
          if (!contains("." + parentElement.classList[c], selectorTextArr))
            selectorTextArr.push("." + parentElement.classList[c]);

        // Add Children element Ids and Classes to the list
        var nodes = parentElement.getElementsByTagName("*");
        for (var i = 0; i < nodes.length; i++) {
          var id = nodes[i].id;
          if (!contains("#" + id, selectorTextArr))
            selectorTextArr.push("#" + id);

          var classes = nodes[i].classList;
          for (var c = 0; c < classes.length; c++)
            if (!contains("." + classes[c], selectorTextArr))
              selectorTextArr.push("." + classes[c]);
        }

        // Extract CSS Rules
        var extractedCSSText = "";
        for (var i = 0; i < document.styleSheets.length; i++) {
          var s = document.styleSheets[i];

          try {
            if (!s.cssRules) continue;
          } catch (e) {
            if (e.name !== "SecurityError") throw e; // for Firefox
            continue;
          }

          var cssRules = s.cssRules;
          for (var r = 0; r < cssRules.length; r++) {
            if (contains(cssRules[r].cssText, selectorTextArr))
              extractedCSSText += cssRules[r].cssText;
          }
        }

        return extractedCSSText;

        function contains(str, arr) {
          return arr.indexOf(str) === -1 ? false : true;
        }
      }

      function appendCSS(cssText, element) {
        var styleElement = document.createElement("style");
        styleElement.setAttribute("type", "text/css");
        styleElement.innerHTML = cssText;
        var refNode = element.hasChildNodes() ? element.children[0] : null;
        element.insertBefore(styleElement, refNode);
      }
    }

    function svgString2Image(svgString, width, height, format, callback) {
      var format = format ? format : "png";

      var imgsrc =
        "data:image/svg+xml;base64," +
        btoa(unescape(encodeURIComponent(svgString))); // Convert SVG string to data URL

      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      var image = new Image();
      image.onload = function () {
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob(function (blob) {
          var filesize = Math.round(blob.size / 1024) + " KB";
          if (callback) callback(blob, filesize);
        });
      };

      image.src = imgsrc;
    }
  };
</script>

<svg id="print" width="0" height="0" />

<button on:click={download} class="download">Download .PNG</button>

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

  .download {
    margin-top: 10px;
    margin-bottom: 0px;
  }
</style>
