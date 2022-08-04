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
    canvasWrapperWidth,
    canvasWrapperHeight,
    isShifted,
    opacity,
  } from "./store";

  import {
    drawPanelGroups,
    drawPanelCoordinates,
  } from "./DrawFunctions/Panels";

  import { handleDragSelect } from "./functions/handleSelect2";

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
      $opacity,
    ];

    $svgRef && draw();
  }

  const draw = () => {
    $svgRef.selectAll("*").remove();

    drawPanelGroups($panels);

    $showCoordinates &&
      $panels.array.forEach((panel) => {
        drawPanelCoordinates(panel);
      });
  };

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

  $: {
    let t = { $canvasWrapperWidth, $canvasWrapperHeight };
    selectBoxOutline && updateDrawOutline();
  }

  let selectBoxOutline;

  $: {
    $isShifted && drawOutline();
    !$isShifted && removeOutline();
  }

  const removeOutline = () => {
    if (!selectBoxOutline) return;
    selectBoxOutline.remove();
  };

  const drawOutline = () => {
    if (!$svgRef) return;

    // Draw Select Box Outline
    // Draw Select Box Outline
    // Draw Select Box Outline
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

  let isDrawingSelectLine = false;
  let selectBox;
  let xOrigin;
  let yOrigin;

  const handleSelectMouseMove = (e) => {
    if (!isDrawingSelectLine || !selectBox) return;
    selectBox.attr(
      "d",
      "M " +
        xOrigin +
        " " +
        yOrigin +
        " H " +
        e.x +
        " V " +
        e.y +
        " H " +
        xOrigin +
        " Z"
    );
  };

  const handleSelectMouseDown = (e) => {
    xOrigin = e.x;
    yOrigin = e.y;
    isDrawingSelectLine = true;
    selectBox = selectBoxOutline
      .append("path")
      .attr("id", "select-box")
      .attr("pointer-events", "none")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");
  };
  const handleSelectMouseUp = (e) => {
    selectBox.remove();
    selectObjects(e, xOrigin, yOrigin);
    isDrawingSelectLine = false;
    selectBox = null;
  };

  const updateDrawOutline = () => {
    selectBoxOutline
      .attr("width", $canvasWrapperWidth)
      .attr("height", $canvasWrapperHeight);
  };

  const selectObjects = (event, xOrigin, yOrigin) => {
    handleDragSelect(event, xOrigin, yOrigin);
  };
</script>
