<script lang="ts">
  import * as d3 from "d3";
  import {
    canvasWrapperWidth,
    canvasWrapperHeight,
    isShifted,
    topLevelSvgRef,
    isDrawingSelectLine,
    setIsDrawingSelectLine,
  } from "../store";

  import { handleDragSelect } from "../functions/HandleSelect";

  let selectBoxOutline: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  $: {
    $isShifted && drawOutline();
    !$isShifted && removeOutline();
  }

  const removeOutline = () => {
    if (!selectBoxOutline) return;
    selectBoxOutline.remove();
  };

  const drawOutline = () => {
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

  let selectBox: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  let xOrigin: number = null;
  let yOrigin: number = null;

  const handleSelectMouseMove = (e) => {
    let x = e.x - 250;
    if (!isDrawingSelectLine || !selectBox) return;
    selectBox.attr(
      "d",
      "M " +
        xOrigin +
        " " +
        yOrigin +
        " H " +
        x +
        " V " +
        e.y +
        " H " +
        xOrigin +
        " Z"
    );
  };

  const handleSelectMouseDown = (e) => {
    xOrigin = e.x - 250;
    yOrigin = e.y;
    selectBox = selectBoxOutline
      .append("path")
      .attr("id", "select-box")
      .attr("pointer-events", "none")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");
    setIsDrawingSelectLine(true);
  };

  const handleSelectMouseUp = (e) => {
    handleDragSelect(e, xOrigin, yOrigin);
    setIsDrawingSelectLine(false);
    selectBox.remove();
    selectBox = null;
  };
</script>
