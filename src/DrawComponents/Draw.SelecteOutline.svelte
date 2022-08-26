<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import {
    canvasWrapperWidth,
    canvasWrapperHeight,
    isShifted,
    topLevelSvgRef,
  } from "../store";

  import { handleDragSelect } from "../functions/HandleSelect";

  let selectBoxOutline;

  $: {
    $isShifted && drawOutline();
    !$isShifted && removeOutline();
  }

  const removeOutline = () => {
    if (!selectBoxOutline) return;
    selectBoxOutline.remove();
  };

  const drawOutline = () => {
    // console.log("draw box outline");
    if (!$topLevelSvgRef) return;

    selectBoxOutline = d3
      .select("#svg")
      .append("g")
      .attr("id", "select-box-outline");

    selectBoxOutline
      .append("rect")
      .attr("width", $canvasWrapperWidth)
      .attr("height", $canvasWrapperHeight)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .attr("opacity", 0)
      .on("mousemove", (e) => {
        e.stopPropagation();
        handleSelectMouseMove(e);
      })
      .on("mousedown", function (e) {
        e.stopPropagation();
        handleSelectMouseDown(e);
      })
      .on("mouseup", function (e) {
        e.stopPropagation();
        handleSelectMouseUp(e);
      });
  };

  let isDrawingSelectLine = false;
  let selectBox;
  let xOrigin;
  let yOrigin;

  const handleSelectMouseMove = (e) => {
    if (!isDrawingSelectLine || !selectBox) return;
    selectBox.attr(
      "d",
      "M " +
        xOrigin +
        " " +
        yOrigin +
        " H " +
        e.x +
        " V " +
        e.y +
        " H " +
        xOrigin +
        " Z"
    );
  };

  const handleSelectMouseDown = (e) => {
    xOrigin = e.x;
    yOrigin = e.y;
    isDrawingSelectLine = true;
    selectBox = selectBoxOutline
      .append("path")
      .attr("id", "select-box")
      .attr("pointer-events", "none")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");
  };

  const handleSelectMouseUp = (e) => {
    selectBox.remove();
    isDrawingSelectLine = false;
    selectBox = null;
    handleDragSelect(e, xOrigin, yOrigin);
  };
</script>
