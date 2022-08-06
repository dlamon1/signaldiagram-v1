<script>
  import { onMount } from "svelte";

  import * as d3 from "d3";

  import {
    signalLines as signalLinesClass,
    snapPoints as snapPointsClass,
    panels as panelsClass,
    panelWrappersRef,
    isSelectMode,
    isDrawMode,
    setIsDrawingSignalLine,
    isDrawingSignalLine,
    selectedPanelRectsRef,
  } from "../store";

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";

  $: {
    // console.log($panelWrappersRef);

    $panelWrappersRef && initPanelGroups();
  }

  export const initPanelGroups = () => {
    // console.log("init panel groups");
    let panels = $panelsClass.array;

    // $selectedPanelRectsRef?.remove();

    // Draw Panel that Fills the G
    // Draw Panel that Fills the G
    // Draw Panel that Fills the G
    $panelWrappersRef
      .append("rect")
      .attr("id", (d) => "panel-rectangle" + d.i)
      .attr("width", (d) => {
        return d.width;
      })
      .attr("height", (d) => d.height)
      .attr("fill", (d) => d.color.background)
      .attr("stroke", (d) => d.color.border)
      .attr("stroke-width", (d) => d.lineWidth)
      .style("point-events", $isDrawingSignalLine && "none")
      .on("mouseover", function (d, i) {
        if ($isDrawMode) {
          return;
        }
        d3.select(this).attr("fill", hoveredColor);
      })
      .on("mouseout", function (d, i) {
        if ($isDrawMode) return;
        let obj = d.path[0].__data__;
        d3.select(this).attr("fill", obj.color.background);
      })
      .on("mousemove", function (d) {
        if (!$isDrawMode) return;
        $signalLinesClass.nullDestinationSnapPointIndex();
        $signalLinesClass.setMousePosition(d);
      })
      .on("mouseup", function (d) {
        $signalLinesClass.nullDestinationSnapPointIndex();
        $signalLinesClass.nullDestinationSnapPointIndex();
        $signalLinesClass.setMousePosition({ x: 0, y: 0 });

        d3.select("#temp-signal-line")
          .attr("x1", null)
          .attr("y1", null)
          .attr("x2", null)
          .attr("y2", null);

        setIsDrawingSignalLine(false);
      })
      .on("click", function (d, i, n) {
        // console.log(d.srcElement.__data__);
        if ($isDrawMode) return;
        // d.srcElement.__data__.toggleIsSelected();
        d.stopPropagation();
        $isSelectMode && !$isDrawingSignalLine && $panelsClass.selectPanel(d);
      });

    // Color Selected Panels
    // Color Selected Panels
    // Color Selected Panels
    $selectedPanelRectsRef = $panelWrappersRef
      .selectAll("rect")
      .filter(function (d) {
        // d.isSelected && console.log(d);
        return d.isSelected;
      })
      .transition()
      .duration(50)
      .attr("stroke", selectedColor)
      .attr("stroke-width", (d) => d.lineWidth * 4);

    // console.log($selectedPanelRectsRef);
  };
</script>
