<script>
  import { onMount } from "svelte";

  import {
    panels,
    snapPoints as snapPointsClass,
    signalLines as signalLinesClass,
    selectedPanels,
    showCoordinates,
    isRearView,
    showDirectionArrows,
    svgRef,
    screenAndPanelDimensions,
    isDrawingSignalLine,
    mode,
    transform,
  } from "./store";

  import {
    drawPanelGroups,
    drawPanelCoordinates,
  } from "./DrawFunctions/Panels";

  $: {
    // console.log("CanvasDraw tigger");

    let triggers = [
      $panels,
      $snapPointsClass,
      $selectedPanels,
      $showDirectionArrows,
      $showCoordinates,
      $screenAndPanelDimensions,
      $isRearView,
      $mode,
    ];

    $svgRef && draw();
  }

  $: {
    let t = $signalLinesClass;
    drawTemporarySignalLine();
  }

  const drawTemporarySignalLine = () => {
    if (!$svgRef) return;
    if (!$isDrawingSignalLine) return;
    // console.log("temp ABOUT TO CHECKS");
    let origin = $signalLinesClass.origin;
    let mouse = $signalLinesClass.mouse;
    if (origin.snapPointIndex && mouse.x && mouse.y) {
      theAcutualDrawing();
      return;
    }
  };

  const theAcutualDrawing = () => {
    let destinationI = $signalLinesClass.destination.snapPointIndex;

    let snapPoint =
      $snapPointsClass.array[$signalLinesClass.origin.snapPointIndex];

    let x1 = $snapPointsClass.getXCoordinate(snapPoint);
    let y1 = $snapPointsClass.getYCoordinate(snapPoint);

    // [tx + k * xo, ty + k * yo]

    let x2 =
      $signalLinesClass.mouse.x / $transform.k - $transform.x / $transform.k;
    let y2 =
      $signalLinesClass.mouse.y / $transform.k - $transform.y / $transform.k;

    if (destinationI) {
      let destinationSanpPoint =
        $snapPointsClass.array[$signalLinesClass.destination.snapPointIndex];

      x2 = $snapPointsClass.getXCoordinate(destinationSanpPoint);
      y2 = $snapPointsClass.getYCoordinate(destinationSanpPoint);
    }

    d3.select("#temp-signal-line")
      .attr("pointer-events", "none")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("stroke", "black");
    // .attr("stroke-width", 5);
  };

  const draw = () => {
    console.log("drawing");

    $svgRef.selectAll("*").remove();

    drawPanelGroups($panels);

    $showCoordinates &&
      $panels.array.forEach((panel) => {
        drawPanelCoordinates(panel);
      });
  };
</script>
