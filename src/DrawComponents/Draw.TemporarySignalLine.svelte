<script lang="ts">
  import * as d3 from "d3";
  import { get } from "svelte/store";
  import {
    snapPoints as snapPointsClass,
    signalLines as signalLinesClass,
    isDrawingSignalLine,
    transform,
    topLevelSvgRef,
    colorState,
    width,
    height,
    snapPointsGroupEnterRef,
    mousePosition,
  } from "../store";

  $: {
    let t = [$signalLinesClass, $mousePosition];
    // console.log("draw temp signal line");
    drawTemporarySignalLine();
  }

  const drawTemporarySignalLine = () => {
    if (!$topLevelSvgRef) return;
    if (!$isDrawingSignalLine) return;

    let origin = $signalLinesClass.origin;
    let mouse = get(mousePosition);
    if (origin.snapPointIndex && mouse.x && mouse.y) {
      theAcutualDrawing();
    }
  };

  const theAcutualDrawing = () => {
    let destinationI = $signalLinesClass.destination.snapPointIndex;

    let snapPoint =
      $snapPointsClass.array[$signalLinesClass.origin.snapPointIndex];

    let x1 = snapPoint.getX();
    let y1 = snapPoint.getY();

    // [tx + k * xo, ty + k * yo]

    let x2 = get(mousePosition).x / $transform.k - $transform.x / $transform.k;
    let y2 = get(mousePosition).y / $transform.k - $transform.y / $transform.k;

    if (destinationI) {
      let destinationSanpPoint =
        $snapPointsClass.array[$signalLinesClass.destination.snapPointIndex];

      x2 = $snapPointsClass.getXCoordinate(destinationSanpPoint);
      y2 = $snapPointsClass.getYCoordinate(destinationSanpPoint);
    }

    let lineWidth = $width < $height ? $width / 20 : $height;

    d3.select("#temp-signal-line")
      .attr("pointer-events", "none")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("stroke", $colorState.signalLine.background);

    if ($snapPointsGroupEnterRef) {
      d3.selectAll("g.snap-point-wrapper").raise();
    }
  };
</script>
