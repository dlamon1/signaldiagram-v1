<script>
  import { onMount } from "svelte";

  import {
    signalLines as signalLinesClass,
    snapPoints as snapPointsClass,
    panels as panelsClass,
    svgRef,
    columns,
    rows,
    isRearView,
    screenAndPanelDimensions,
    width,
    height,
    isSelectMode,
    isDrawMode,
    canvasWrapperWidth,
    canvasWrapperHeight,
    setIsDrawingSignalLine,
    isDrawingSignalLine,
    opacity,
    mode,
  } from "../store";

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";

  $: {
    console.log("CanvasDraw tigger");

    let triggers = [
      $panelsClass,
      $snapPointsClass,
      $screenAndPanelDimensions,
      $mode,
    ];

    $svgRef.gZoomWrapper && initPanelGroups();
  }

  export const initPanelGroups = () => {
    console.log("Panel draw");

    let panels = $panelsClass.array;

    let panelSvgElement;

    // Draw a G for each Panel
    // Draw a G for each Panel
    // Draw a G for each Panel
    $svgRef.panelWrapper = $svgRef.gZoomWrapper
      .selectAll("svg")
      .data(panels)
      .enter()
      .append("svg")
      .attr("id", (d) => "panel-group" + d.i)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .style("point-events", $isDrawingSignalLine && "none");

    // Draw Panel that Fills the G
    // Draw Panel that Fills the G
    // Draw Panel that Fills the G
    $svgRef.panelWrapper
      .append("rect")
      .attr("id", (d) => "panel-rectangle" + d.i)
      .attr("class", $isSelectMode && "hover")
      .attr("width", (d) => {
        return d.width;
      })
      .attr("height", (d) => d.height)
      .attr("fill", (d) => d.color.background)
      .attr("stroke", (d) => {
        if (d.isSelected) {
          return selectedColor;
        }
        if (d.isHovered) {
          return hoveredColor;
        }
        return d.color.border;
      })
      .attr("stroke-width", (d) =>
        d.isSelected ? d.lineWidth * 4 : d.lineWidth
      )
      .style("point-events", $isDrawingSignalLine && "none")
      .on("mouseover", function (d, i) {
        if ($isDrawMode) {
          return;
        }
        let obj = d.path[0].__data__;
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
        console.log(d.srcElement.__data__);
        d.srcElement.__data__.setIsSelected(true);
        // d.stopPropagation();
        if ($isDrawMode) return;
        // $isSelectMode && !$isDrawingSignalLine && this.selectPanel(d);
      });
  };
</script>
