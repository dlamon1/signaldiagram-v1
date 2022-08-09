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
    isRearView,
    columns,
    rows,
    snapPointsQuantity,
    setIsDrawingSignalLine,
    transform,
  } from "../store";

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";

  import * as d3 from "d3";

  $: {
    let t = [$panelsClass, $isRearView, $isDrawMode, $snapPointsClass];

    // console.log($panelsClass);

    setTimeout(() => drawPanelWrappers(), 20);
  }

  const drawPanelWrappers = () => {
    let panels = $panelsClass.array;

    // 1
    $groups = $gZoomWrapperRef
      .selectAll("g.panel-wrapper")
      .data(panels, (d) => d.i);

    // 2
    $groupsEnter = $groups.enter().append("g").classed("panel-wrapper", true);

    // 3
    $groupsEnter
      .merge($groups)
      .transition()
      // .call((d) => console.log(d))
      .attr("id", (d) => "panelgroup" + d.i)
      .attr("transform", (d) => {
        return "translate(" + d.x + "," + d.y + ")";
      });

    // 4
    $groups.exit().remove();

    //5
    let rects = $groupsEnter
      .append("rect")
      .merge($groups.select("rect"))
      // .attr("class", "panel-wrapper")
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
        if ($isDrawMode) return;
        d.stopPropagation();
        $isSelectMode && !$isDrawingSignalLine && $panelsClass.selectPanel(d);
      });

    // Draw Coordinates
    // Draw Coordinates
    // Draw Coordinates
    $groupsEnter
      .append("text")
      .merge($groups.select("text"))
      .text((d) => {
        if ($isRearView) {
          return $columns - d.column + "," + (d.row + 1);
        } else {
          return d.column + 1 + "," + (d.row + 1);
        }
      })
      .attr("x", (d) => d.width / 32)
      .attr("y", (d) => d.height / 32)
      .attr("dominant-baseline", "hanging")
      .style("font-size", (d) => d.width / 6 + "px")
      .style("pointer-events", "none")
      .style("user-select", "none");

    // Draw Selected Panels
    // Draw Selected Panels
    // Draw Selected Panelss
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

    // Draw Snap Points
    // Draw Snap Points
    // Draw Snap Points
    // 1
    let snapPointGroups = d3
      .selectAll("g.panel-wrapper")
      .selectAll("g")
      .data((d, i) => {
        // console.log(d.snapPointObjects);
        return d.snapPointObjects;
      });

    // 2
    let snapPointsGroupsEnter = snapPointGroups
      .enter()
      .append("g")
      .attr("id", (d, i) => "snap-point" + i)
      .attr("class", "snap-point");

    // 3
    snapPointsGroupsEnter.merge(snapPointGroups).attr("transform", (d) => {
      return "translate(" + d.x + "," + d.y + ")";
    });

    // 4
    snapPointGroups.exit().remove();

    // 5
    let circs = snapPointsGroupsEnter
      .append("path")
      .merge(snapPointGroups.select("path"))
      .attr("d", (d) => drawPathCircle(d.radius))
      .style("point-events", $isDrawingSignalLine && "none")
      .attr("fill", (d) =>
        d.isSelected && !$isDrawingSignalLine
          ? selectedColor
          : d.color.background
      )
      .attr("stroke-width", 3)
      .attr("stroke", (d) => d.color.border)
      .style("paint-order", "stroke")
      .attr("stroke-alignment", "inner")
      .on("mouseover", function (d, i) {
        // console.log("mouse over");
        if ($isDrawingSignalLine) {
          $signalLinesClass.setDestinationSnapPointIndex(d);
        }
        d.stopPropagation();
        let obj = d.path[0].__data__;
        d3.select(this).attr("fill", hoveredColor);
        // .attr("stroke-width", obj.lineWidth * 4);
      })
      .on("mouseout", function (d, i) {
        d.stopPropagation();
        let obj = d.path[0].__data__;
        d3.select(this).attr("fill", obj.color.background);
        // .attr("stroke-width", obj.lineWidth);
      })

      .on("mousedown", function (d, i) {
        d.stopPropagation();
        if (!$isDrawMode) return;

        $signalLinesClass.setOriginSnapPointIndex(d);
        setIsDrawingSignalLine(true);
      })
      .on("mouseup", (d) => {
        d.stopPropagation();
        // setIsDrawingSignalLine(false);
        if ($isDrawMode && $isDrawingSignalLine) {
          $signalLinesClass.addSignalLine();
          setIsDrawingSignalLine(false);
        }
      })
      .on("click", (e) => {
        e.stopPropagation();
        if (!$isDrawMode) {
          $snapPointsClass.selectSnapPoint(e);
        }
      });

    // .attr("d", "")
    // .attr("d", (d) => drawPathCircle(d.radius));

    circs
      .filter((d, i) => {
        return $snapPointsClass.array[d.pointIndexFullArray].isSquare;
      })
      .attr("fill", (d) => d.color.background)
      .attr("stroke", (d) => d.color.border)
      .attr("stroke-width", (d) => d.radius)
      .attr("d", "")
      .attr("d", (d) => drawPathSquare(d.radius));
    // .transition()
    // .duration(120)

    circs
      .filter((d, i) => {
        return $snapPointsClass.array[d.pointIndexFullArray].isSelected;
      })
      .attr("stroke", selectedColor)
      .attr("stroke-width", (d) => d.radius);
  };

  const drawPathSquare = (r) => {
    r = 2 * r;
    let l = 2 * r;
    let rectPath =
      "M " +
      r +
      " " +
      r +
      " v " +
      -l +
      " h " +
      -l +
      " v " +
      l +
      " h " +
      l +
      " Z";
    return rectPath;
  };

  const drawPathCircle = (r) => {
    // let r = d.radius * 1.5;
    let circlePath =
      "M " +
      0 +
      "," +
      0 +
      " m " +
      -r +
      ",0" +
      " a " +
      r +
      "," +
      r +
      " 0 1,0 " +
      r * 2 +
      ",0" +
      " a " +
      r +
      "," +
      r +
      " 0 1,0 " +
      -r * 2 +
      ",0";
    return circlePath;
  };
</script>
