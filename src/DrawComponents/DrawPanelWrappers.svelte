<script>
  import {
    signalLines as signalLinesClass,
    snapPoints as snapPointsClass,
    panels as panelsClass,
    svgRef,
    isDrawingSignalLine,
    gZoomWrapperRef,
    panelWrappersRef,
    mode,
    topLevelSvgRef,
    isDrawMode,
    isSelectMode,
    groups,
    groupsEnter,
  } from "../store";

  let oldPanelLength;
  let panelWrappersData = null;
  let init = false;

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";
  // console.log($topLevelSvgRef);

  import * as d3 from "d3";

  $: {
    let t = [$panelsClass];

    drawPanelWrappers();
  }

  const drawPanelWrappers = () => {
    let panels = $panelsClass.array;
    // console.log("draw");
    init = true;

    console.log($gZoomWrapperRef);

    $groups = $gZoomWrapperRef.selectAll("g").data(panels, (d) => d.i);

    $groupsEnter = $groups.enter().append("g");

    $groupsEnter.merge($groups).attr("transform", (d) => {
      return "translate(" + d.x + "," + d.y + ")";
    });

    $groups.exit().remove();

    let rects = $groupsEnter
      .append("rect")
      .merge($groups.select("rect"))
      .attr("class", "panel-wrapper")
      .attr("id", (d) => {
        "panel-rectangle" + d.i;
      })
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", (d) => d.width)
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

        // setIsDrawingSignalLine(false);
      })
      .on("click", function (d, i, n) {
        // console.log(d.srcElement.__data__);
        if ($isDrawMode) return;
        // d.srcElement.__data__.toggleIsSelected();
        d.stopPropagation();
        $isSelectMode && !$isDrawingSignalLine && $panelsClass.selectPanel(d);
      });

    rects
      .filter(function (d) {
        return d.isSelected;
      })
      .attr("x", (d) => d.lineWidth)
      .attr("y", (d) => d.lineWidth)
      .attr("width", (d) => {
        return d.width - d.lineWidth * 2;
      })
      .attr("height", (d) => d.height - d.lineWidth * 2)
      .attr("stroke", selectedColor)
      .attr("stroke-width", (d) => d.lineWidth * 2);
  };
</script>
