<script lang="ts">
  import {
    signalLines as signalLinesClass,
    snapPoints as snapPointsClass,
    panels as panelsClass,
    isDrawingSignalLine,
    gZoomWrapperRef,
    isDrawMode,
    isRearView,
    snapPointsGroupRef,
    setIsDrawingSignalLine,
    width,
    height,
    snapPointsGroupEnterRef,
    snapPointPathRef,
    snapPointDirection,
    snapPointsQuantity,
    snapPoints,
    screens,
    currentScreenIndex,
  } from "../store";

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";

  import * as d3 from "d3";

  import type { SnapPointObj } from "../Types/ClassTypes";

  $: {
    let t = [
      $panelsClass,
      $isRearView,
      $isDrawMode,
      $snapPointsClass,
      $isDrawingSignalLine,
      $snapPointDirection,
      $snapPointsQuantity,
      $screens,
      $currentScreenIndex,
    ];

    $gZoomWrapperRef && drawSnapPointWrappers();
  }

  const drawSnapPointWrappers = () => {
    // console.log("draw snap Points");

    if (typeof $currentScreenIndex != "number") {
      return;
    }

    let snapPoints = $screens[$currentScreenIndex].snapPoints.array;

    // 1
    $snapPointsGroupRef = $gZoomWrapperRef
      .selectAll("g.snap-point-wrapper")
      .data(snapPoints, (d) => d.i);

    // 2
    $snapPointsGroupEnterRef = $snapPointsGroupRef
      .enter()
      .append("g")
      .attr("id", (_: SnapPointObj, i: number) => "snap-point" + i)
      .classed("snap-point-wrapper", true)
      .raise();

    // 3
    $snapPointsGroupEnterRef
      .merge($snapPointsGroupRef)
      .attr("transform", (d) => {
        return d.getTranslateString();
      });

    // 4
    $snapPointsGroupRef.exit().remove();

    // 5
    $snapPointPathRef = $snapPointsGroupEnterRef
      .append("path")
      .merge($snapPointsGroupRef.select("path"))
      .attr("d", (d) => {
        let r = d.radius;
        if ($isDrawMode) {
          r = d.radius * 1.5;
        }
        return drawPathCircle(r);
      })
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
        if ($isDrawingSignalLine) {
          $screens[
            $currentScreenIndex
          ].signalLines.setDestinationSnapPointIndex(d.path[0].__data__);
        }
        d.stopPropagation();
        let obj = d.path[0].__data__;
        d3.select(this).attr("fill", hoveredColor);
      })
      .on("mouseout", function (d, i) {
        d.stopPropagation();
        drawSnapPointWrappers();
      })

      .on("mousedown", function (d, i) {
        d.stopPropagation();
        if (!$isDrawMode) return;

        $screens[$currentScreenIndex].signalLines.setOriginSnapPointIndex(
          d.path[0].__data__
        );
        setIsDrawingSignalLine(true);
      })
      .on("mouseup", (d) => {
        d.stopPropagation();
        if ($isDrawMode && $isDrawingSignalLine) {
          $screens[$currentScreenIndex].signalLines.addSignalLine();
        }
        setIsDrawingSignalLine(false);
      })
      .on("click", (e) => {
        e.stopPropagation();
        if (!$isDrawMode) {
          $screens[$currentScreenIndex].snapPoints.selectSnapPoint(e);
        }
      });

    // Draw as Square is Square
    // Draw as Square is Square
    // Draw as Square is Square
    $snapPointPathRef
      .filter((d, i) => {
        return $screens[$currentScreenIndex].snapPoints.array[
          d.pointIndexFullArray
        ].isSquare;
      })
      .attr("fill", (d) => {
        return d.color.background;
      })
      .attr("stroke", (d) => d.color.border)
      .attr("stroke-width", (d) => d.strokeWidth)
      .attr("d", "")
      .attr("d", (d) => drawPathSquare(d.radius))
      .attr("fill", (d, i) => {
        return $screens[$currentScreenIndex].snapPoints.array[
          d.pointIndexFullArray
        ].color.background;
      });

    // Draw as Triangle
    // Draw as Triangle
    // Draw as Triangle
    $snapPointPathRef
      .filter((d, i) => {
        return $screens[$currentScreenIndex].snapPoints.array[
          d.pointIndexFullArray
        ].isTriangle;
      })
      .attr("fill", (d) => {
        return d.color.background;
      })
      .attr("stroke", (d) => d.color.border)
      .attr("stroke-width", (d) => d.strokeWidth)
      .attr("d", "")
      .attr("d", (d) => drawPathTriangle(d.radius))
      .attr("fill", (d, i) => {
        return $screens[$currentScreenIndex].snapPoints.array[
          d.pointIndexFullArray
        ].color.background;
      });

    // Draw Snap Point Label
    // Draw Snap Point Label
    // Draw Snap Point Label
    let labels = $snapPointsGroupEnterRef
      .append("text")
      .merge($snapPointsGroupRef.select("text"));

    labels.text("");

    labels
      .filter((d, i) => {
        let obj =
          $screens[$currentScreenIndex].snapPoints.array[d.pointIndexFullArray];
        return obj.isSquare || obj.isTriangle;
      })
      .text((d) => {
        return d.getLabelString();
      })
      .attr("dominant-baseline", "middle")
      .style("font-size", (d) =>
        $width < $height ? $width / 6 + "px" : $height / 6 + "px"
      )
      .style("pointer-events", "none")
      .attr("y", (d) => {
        let obj =
          $screens[$currentScreenIndex].snapPoints.array[d.pointIndexFullArray];
        if (obj.isTriangle) {
          return obj.radius;
        }
        return 0;
      })
      .style("user-select", "none")
      .style("font-family", "Heebo")
      .attr("text-anchor", "middle")
      .attr("stroke", (d) => {
        return $screens[$currentScreenIndex].snapPoints.array[
          d.pointIndexFullArray
        ].color.font;
      })
      .attr("fill", (d) => {
        return $screens[$currentScreenIndex].snapPoints.array[
          d.pointIndexFullArray
        ].color.font;
      });

    // Draw as Selected if Selected
    // Draw as Selected if Selected
    // Draw as Selected if Selected
    $snapPointPathRef
      .filter((d, i) => {
        return $screens[$currentScreenIndex].snapPoints.array[
          d.pointIndexFullArray
        ].isSelected;
      })
      .attr("stroke", selectedColor)
      .attr("stroke-width", (d) => d.strokeWidth)
      .attr("fill", (d, i) => {
        return $screens[$currentScreenIndex].snapPoints.array[
          d.pointIndexFullArray
        ].color.background;
      });

    $snapPointPathRef
      .filter((d, i) => {
        return $screens[$currentScreenIndex].snapPoints.array[
          d.pointIndexFullArray
        ].isHidden;
      })
      .attr("stroke", "transparent")
      .attr("fill", "transparent");
  };

  const drawPathTriangle = (r: number) => {
    let length = 2 * r;

    let trianglePath =
      "M " +
      " 0 " +
      -length +
      " L " +
      length +
      " " +
      length +
      " L " +
      -length +
      " " +
      length +
      " Z";
    return trianglePath;
  };

  const drawPathSquare = (r: number) => {
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

  const drawPathCircle = (r: number) => {
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
