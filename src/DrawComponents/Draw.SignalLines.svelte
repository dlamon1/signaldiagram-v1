<script lang="ts">
  import {
    signalLines as signalLinesClass,
    snapPoints as snapPointsClass,
    panels as panelsClass,
    isDrawingSignalLine,
    gZoomWrapperRef,
    isSelectMode,
    isRearView,
    width,
    height,
    showDirectionArrows,
    linesGroupRef,
    linesGroupEnterRef,
    snapPointsGroupEnterRef,
    snapPointsQuantity,
    snapPointDirection,
    isDrawMode,
  } from "../store";

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";

  import * as d3 from "d3";

  import type { SignalLineObj } from "../Types/ClassTypes";

  $: {
    // console.log("triggered");
    let t = [
      $panelsClass,
      $isRearView,
      $snapPointsClass,
      $isDrawingSignalLine,
      $showDirectionArrows,
      $snapPointsQuantity,
      $snapPointDirection,
    ];

    drawSignalLines();
  }

  const drawSignalLines = () => {
    // Signal Line Wrapper
    // Signal Line Wrapper
    // Signal Line Wrapper
    $linesGroupRef = $gZoomWrapperRef
      .selectAll("g.signal-line")
      .data($signalLinesClass.array, (d: SignalLineObj) => d.i);

    $linesGroupEnterRef = $linesGroupRef
      .enter()
      .append("g")
      .attr("id", (d: SignalLineObj) => "line-group" + d.i)
      .classed("signal-line", true);

    $linesGroupEnterRef.merge($linesGroupRef).transition();

    $linesGroupRef.exit().remove();

    // Line Outline
    // Line Outline
    // Line Outline
    let signalLineOutline = $linesGroupEnterRef
      .append("line")
      .merge($linesGroupRef.select("line.line-outline"))
      .attr("id", (d) => "line-outline" + d.i)
      .classed("line-outline", true)
      .attr(
        "x1",
        (d, i) => $signalLinesClass.getSnapPointCoordinates(i, "origin").x
      )
      .attr(
        "y1",
        (d, i) => $signalLinesClass.getSnapPointCoordinates(i, "origin").y
      )
      .attr(
        "x2",
        (d, i) => $signalLinesClass.getSnapPointCoordinates(i, "destination").x
      )
      .attr(
        "y2",
        (d, i) => $signalLinesClass.getSnapPointCoordinates(i, "destination").y
      )
      .attr("stroke", (d) => {
        if (d.isSelected) {
          return selectedColor;
        } else {
          return "none";
        }
      })
      .attr("stroke-width", (d) => d.lineWidth * 2)
      .attr("pointer-events", "visible")
      .on("mouseover", (e) => {
        if ($isDrawMode) return;
        e.stopPropagation();
        $isSelectMode &&
          !$isDrawingSignalLine &&
          d3.select(e.path[0]).attr("stroke", hoveredColor);
      })
      .on("mouseout", (e, d) => {
        if ($isDrawMode) return;
        e.stopPropagation();
        $isSelectMode &&
          !$isDrawingSignalLine &&
          d3.select(e.path[0]).attr("stroke", () => {
            if (d.isSelected) {
              return selectedColor;
            } else {
              return "none";
            }
          });
      })
      .on("click", function (e) {
        if ($isDrawMode) return;
        e.stopPropagation();
        let i = e.path[0].__data__.i;
        if ($isSelectMode && !$isDrawingSignalLine) {
          $signalLinesClass.selectSignalLine(i);
          d3.select(this).attr("stroke", selectedColor);
        }
      });

    // Line
    // Line
    // Line
    let signalLineBase = $linesGroupEnterRef
      .append("line")
      .merge($linesGroupRef.select("line.line-base"))
      .attr("id", (d) => "line-base" + d.i)
      .classed("line-base", true)
      .attr(
        "x1",
        (d, i) => $signalLinesClass.getSnapPointCoordinates(i, "origin").x
      )
      .attr(
        "y1",
        (d, i) => $signalLinesClass.getSnapPointCoordinates(i, "origin").y
      )
      .attr(
        "x2",
        (d, i) => $signalLinesClass.getSnapPointCoordinates(i, "destination").x
      )
      .attr(
        "y2",
        (d, i) => $signalLinesClass.getSnapPointCoordinates(i, "destination").y
      )
      .attr("stroke", (d) => {
        return d.color.background;
      })
      // .attr("stroke", "blue")
      .attr("stroke-width", (d) => d.lineWidth)
      .attr("pointer-events", "none");

    let directionArrows = $linesGroupEnterRef
      .append("polygon")
      .merge($linesGroupRef.select("polygon.direction-arrow"))
      .classed("direction-arrow", true)
      .attr("points", (d, i) => {
        return "0,-6 7,10 -7,10";
      })
      .attr("transform", (d, i) => {
        let origin = $signalLinesClass.getSnapPointCoordinates(i, "origin");
        let destination = $signalLinesClass.getSnapPointCoordinates(
          i,
          "destination"
        );
        let midpoint = {
          x: origin.x + (destination.x - origin.x) / 2,
          y: origin.y + (destination.y - origin.y) / 2,
        };

        let angle =
          -Math.atan2(destination.x - origin.x, destination.y - origin.y) *
            (180 / Math.PI) +
          180;

        return (
          "translate(" +
          midpoint.x +
          "," +
          midpoint.y +
          ") rotate(" +
          angle +
          ")"
        );
      })
      .attr("fill", (d) => {
        return d.color.background;
      })
      .attr("stroke", (d) => {
        return d.color.background;
      })
      .attr("stroke-width", (d) => {
        return d.lineWidth;
      })
      .attr("pointer-events", "none");

    if (!$showDirectionArrows) {
      directionArrows.attr("points", (d, i) => {
        return "0,0 0,0 0,0";
      });
    }

    // Init Temporary Signal Line
    // Init Temporary Signal Line
    // Init Temporary Signal Line
    $gZoomWrapperRef
      .append("line")
      .attr("id", "temp-signal-line")
      .attr("stroke", "black")
      .attr("stroke-width", $width < $height ? $width / 20 : $height / 20)
      .raise();

    if ($snapPointsGroupEnterRef) {
      d3.selectAll("g.snap-point-wrapper").raise();
    }
  };
</script>
