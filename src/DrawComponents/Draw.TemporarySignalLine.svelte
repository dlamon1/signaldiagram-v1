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
    screens,
    currentScreenIndex,
  } from "../store";

  $: {
    let t = [$screens, $mousePosition];
    // console.log("draw temp signal line");
    typeof $currentScreenIndex === "number" && drawTemporarySignalLine();
  }

  const drawTemporarySignalLine = () => {
    if (!$topLevelSvgRef) return;
    if (!$isDrawingSignalLine) return;

    const signalLines = $screens[$currentScreenIndex].signalLines;

    let origin = signalLines.origin;
    let mouse = get(mousePosition);
    if (origin.snapPointIndex >= 0 && mouse.x && mouse.y) {
      theAcutualDrawing();
    }
  };

  const theAcutualDrawing = () => {
    const snapPoints = $screens[$currentScreenIndex].snapPoints;
    const signalLines = $screens[$currentScreenIndex].signalLines;

    let destinationI = signalLines.destination.snapPointIndex;

    let snapPoint = snapPoints.array[signalLines.origin.snapPointIndex];

    let x1 = snapPoint.getX();
    let y1 = snapPoint.getY();

    // [tx + k * xo, ty + k * yo]

    let x2 =
      (get(mousePosition).x - 250) / $transform.k - $transform.x / $transform.k;
    let y2 = get(mousePosition).y / $transform.k - $transform.y / $transform.k;

    if (destinationI) {
      let destinationSnapPoint =
        $snapPointsClass.array[$signalLinesClass.destination.snapPointIndex];

      x2 = destinationSnapPoint.getX();
      y2 = destinationSnapPoint.getY();
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
