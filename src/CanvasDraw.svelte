<script>
  import { onMount } from "svelte";

  import {
    panels,
    snapPoints,
    signalLines,
    isSelectingPanels,
    selectedPanels,
    selectedSignalLines,
    selectedSnapPoints,
    ctxRef,
    hoveredPanels,
    hoveredSignalLines,
    hoveredSnapPoints,
    showCoordinates,
    squares,
    circles,
    hoveredSquares,
    selectedSquares,
    mouseCoordinates,
    canvasWidth,
    canvasHeight,
    isShifted,
    columns,
    colorState,
    isRearView,
    showDirectionArrows,
    svgRef,
    innerHeight,
    innerWidth,
    screenAndPanelDimensions,
  } from "./store";

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";

  $: {
    // console.log("CanvasDraw render");

    let triggers = {
      $panels,
      $snapPoints,
      $signalLines,
      $selectedPanels,
      $selectedSignalLines,
      $selectedSnapPoints,
      $selectedSquares,
      $hoveredPanels,
      $hoveredSignalLines,
      $hoveredSnapPoints,
      $squares,
      $circles,
      $mouseCoordinates,
      $columns,
      $showDirectionArrows,
      $showCoordinates,
      $screenAndPanelDimensions,
      $isRearView,
    };

    $svgRef && draw();
  }

  import {
    drawPanelGroups,
    drawPanelCoordinates,
    drawHoveredPanel,
    drawSelectedPanel,
  } from "./DrawFunctions/Panels";

  const draw = () => {
    // console.log("drawing");

    $svgRef.selectAll("*").remove();

    // $svgRef.attr("transform", "translate(60 60)");

    // console.log($panels);

    drawPanelGroups($panels);

    // $isSelectingPanels &&
    //   !$isShifted &&
    //   $hoveredPanels.forEach((hoveredPanel, i) => {
    //     // drawHoveredPanel(hoveredPanel);
    //   });

    $showCoordinates &&
      $panels.array.forEach((panel) => {
        drawPanelCoordinates(panel);
      });

    // $hoveredSignalLines.forEach((hoveredSignalLine, i) => {
    //   drawHoveredSignalLine(hoveredSignalLine);
    // });

    // $selectedSignalLines.forEach((selectedSignalLine, i) => {
    //   drawSelectedSignalLine(selectedSignalLine);
    // });

    // $signalLines.array.forEach((signalLine, i) => {
    //   drawSignalLineFromArray(signalLine);
    // });

    // $snapPoints.forEach((snapPoint) => {
    //   drawSnapPoint(snapPoint);
    // });

    // !$isShifted &&
    //   $hoveredSnapPoints.forEach((snapPoint) => {
    //     drawHoveredSnapPoint(snapPoint);
    //   });

    // $selectedPanels.forEach((selectedPanel, i) => {
    //   drawSelectedPanel(selectedPanel);
    // });

    // $selectedSnapPoints.forEach((selectedSnapPoint, i) => {
    //   drawSelectedSnapPoint(selectedSnapPoint);
    // });

    // $squares.forEach((square) => {
    //   if (square.isOn) {
    //     drawSquare(square);
    //     drawPointLabel(square);
    //   }
    // });

    // !$isShifted &&
    //   $hoveredSquares.forEach((square) => {
    //     drawHoveredSquare(square);
    //   });

    // $selectedSquares.forEach((square) => {
    //   drawSelectedSquare(square);
    // });

    // $isRearView && drawRearViewLabel();

    // $mouseCoordinates.isDrawingSignalLine &&
    //   drawSignalLineWhileMouseMovesCoordinates();

    // $mouseCoordinates.isDragging && drawDragSelection();
  };

  // const drawRearViewLabel = () => {
  //   let panelWidth = $panels[0].width;
  //   let panelHeight = $panels[0].height;

  //   let size = $canvasWidth / 6 + "px";
  //   size = (panelWidth * $columns) / 6 + "px";
  //   $ctxRef.font = "bold " + size + " sans-serif";
  //   let text = "REAR VIEW";
  //   $ctxRef.fillStyle = "rgba(0, 0, 0, .1)";
  //   $ctxRef.textAlign = "center";
  //   $ctxRef.fillText(
  //     text,
  //     canvas.width / 2,
  //     canvas.height / 2 - $canvasWidth / 15
  //   );
  // };

  // const drawSignalLineWhileMouseMovesCoordinates = () => {
  //   let m = $mouseCoordinates;
  //   $ctxRef.beginPath();
  //   $ctxRef.lineWidth = 3;
  //   $ctxRef.moveTo(m.closestSnapPoint.origin.x, m.closestSnapPoint.origin.y);
  //   $ctxRef.lineTo(m.end.x, m.end.y);
  //   $ctxRef.strokeStyle = $colorState.signalLine.background;
  //   $ctxRef.stroke();
  // };

  // const drawHoveredSignalLine = (signalLine) => {
  //   let origin = $snapPoints[signalLine.origin.i];
  //   let end = $snapPoints[signalLine.end.i];
  //   $ctxRef.beginPath();
  //   $ctxRef.lineWidth = signalLine.lineWidth + 2;
  //   $ctxRef.moveTo(origin.x, origin.y);
  //   $ctxRef.lineTo(end.x, end.y);
  //   $ctxRef.strokeStyle = hoveredColor;
  //   $ctxRef.stroke();
  // };

  // const drawSelectedSignalLine = (signalLine) => {
  //   let origin = $snapPoints[signalLine.origin.i];
  //   let end = $snapPoints[signalLine.end.i];
  //   $ctxRef.beginPath();
  //   $ctxRef.lineWidth = signalLine.lineWidth + 2;
  //   $ctxRef.moveTo(origin.x, origin.y);
  //   $ctxRef.lineTo(end.x, end.y);
  //   $ctxRef.strokeStyle = selectedColor;
  //   $ctxRef.stroke();
  // };

  // const drawSelectedSquare = (square) => {
  //   $ctxRef.strokeStyle = selectedColor;
  //   $ctxRef.lineWidth = 2;
  //   $ctxRef.strokeRect(
  //     square.x - square.width / 2,
  //     square.y - square.width / 2,
  //     square.width,
  //     square.width
  //   );
  // };

  // const drawHoveredSquare = (square) => {
  //   $ctxRef.strokeStyle = hoveredColor;
  //   $ctxRef.lineWidth = 2;
  //   $ctxRef.strokeRect(
  //     square.x - square.width / 2,
  //     square.y - square.width / 2,
  //     square.width,
  //     square.width
  //   );
  // };

  // const drawSelectedSnapPoint = (point) => {
  //   if (point.hasSquare) {
  //     drawSelectedSquare(point);
  //     return;
  //   }
  //   $ctxRef.beginPath();
  //   $ctxRef.arc(point.x, point.y, point.radius * 2, 0, 2 * Math.PI, false);
  //   $ctxRef.fillStyle = selectedColor;
  //   $ctxRef.fill();
  //   $ctxRef.lineWidth = 1;
  //   $ctxRef.strokeStyle = "black";
  //   $ctxRef.stroke();
  // };

  // const drawHoveredSnapPoint = (point) => {
  //   if (point.hasSquare) {
  //     drawHoveredSquare(point);
  //     return;
  //   }
  //   $ctxRef.beginPath();
  //   $ctxRef.arc(point.x, point.y, point.radius * 2, 0, 2 * Math.PI, false);
  //   $ctxRef.fillStyle = hoveredColor;
  //   $ctxRef.fill();
  //   $ctxRef.lineWidth = 1;
  //   $ctxRef.strokeStyle = "black";
  //   $ctxRef.stroke();
  // };

  // const drawPanelSelectedOverlay = (panel) => {
  //   $ctxRef.strokeStyle = selectedColor;
  //   $ctxRef.lineWidth = 5;
  //   $ctxRef.strokeRect(
  //     panel.x + 2.5,
  //     panel.y + 2.5,
  //     panel.width - 5,
  //     panel.height - 5
  //   );
  // };

  // const drawHoveredPanel = (panel) => {
  //   $ctxRef.fillStyle = hoveredColor;
  //   $ctxRef.lineWidth = panel.lineWidth;
  //   $ctxRef.fillRect(panel.x, panel.y, panel.width, panel.height);
  //   $ctxRef.strokeStyle = panel.borderColor;
  //   $ctxRef.lineWidth = 1;
  //   $ctxRef.strokeRect(panel.x, panel.y, panel.width, panel.height);
  // };

  // const drawPanelRectangle = (panel) => {
  //   $ctxRef.fillStyle = panel.backgroundColor;
  //   $ctxRef.lineWidth = panel.lineWidth;
  //   $ctxRef.fillRect(panel.x, panel.y, panel.width, panel.height);
  //   $ctxRef.strokeStyle = panel.borderColor;
  //   $ctxRef.lineWidth = 1;
  //   $ctxRef.strokeRect(panel.x, panel.y, panel.width, panel.height);
  // };

  // draw an svg rectangle on the svg with $svgRef as the parent
  // const drawPanelRectangle = () => {
  //   let shape = document.createElementNS(svgns, "rect");
  //   newRect.setAttribute("x");
  //   newRect.setAttribute("y", "150");
  //   newRect.setAttribute("width", "100");
  //   newRect.setAttribute("height", "100");
  //   newRect.setAttribute("fill", "#5cceee");
  //   // shape.setAttributeNS(null, "cx", 25);
  //   // shape.setAttributeNS(null, "cy", 25);
  //   // shape.setAttributeNS(null, "r", 20);
  //   // shape.setAttributeNS(null, "fill", "blue");
  //   // $svgRef.appendChild(shape);
  // };

  // onMount(() => {
  //   drawPanelRectangle();
  // });

  // const drawPanelCoordinates = (panel) => {
  //   $ctxRef.textAlign = "left";
  //   $ctxRef.font = panel.width / 7 + "px arial";
  //   $ctxRef.textBaseline = "hanging";
  //   $ctxRef.fillStyle = "black";
  //   panel.isRearView
  //     ? $ctxRef.fillText(
  //         $columns - panel.column + "/" + (panel.row + 1),
  //         panel.x + 8,
  //         panel.y + 8
  //       )
  //     : $ctxRef.fillText(
  //         panel.column + 1 + "/" + (panel.row + 1),
  //         panel.x + 8,
  //         panel.y + 8
  //       );
  // };

  // const drawDirectionArrows = (signalLine) => {
  //   let angle = Math.atan2(
  //     signalLine.end.y - signalLine.origin.y,
  //     signalLine.end.x - signalLine.origin.x
  //   );
  //   angle += Math.PI / 2;
  //   angle += Math.PI;
  //   let origin = $snapPoints[signalLine.origin.i];
  //   let end = $snapPoints[signalLine.end.i];

  //   let midpoint = {
  //     x: origin.x + (end.x - origin.x) / 3,
  //     y: origin.y + (end.y - origin.y) / 3,
  //   };

  //   let midpoint2 = {
  //     x: origin.x + ((end.x - origin.x) / 3) * 2,
  //     y: origin.y + ((end.y - origin.y) / 3) * 2,
  //   };

  //   $ctxRef.save();
  //   $ctxRef.translate(midpoint.x, midpoint.y);
  //   $ctxRef.rotate(angle);

  //   $ctxRef.beginPath();
  //   $ctxRef.moveTo(0, 0);
  //   $ctxRef.lineTo(6, 0);
  //   $ctxRef.lineTo(0, 15);
  //   $ctxRef.lineTo(-6, 0);
  //   $ctxRef.closePath();
  //   $ctxRef.fillStyle = signalLine.backgroundColor;
  //   $ctxRef.fill();

  //   $ctxRef.rotate(-angle);
  //   $ctxRef.restore();

  //   $ctxRef.save();
  //   $ctxRef.translate(midpoint2.x, midpoint2.y);
  //   $ctxRef.rotate(angle);

  //   $ctxRef.beginPath();
  //   $ctxRef.moveTo(0, 0);
  //   $ctxRef.lineTo(6, 0);
  //   $ctxRef.lineTo(0, 15);
  //   $ctxRef.lineTo(-6, 0);
  //   $ctxRef.closePath();
  //   $ctxRef.fillStyle = signalLine.backgroundColor;
  //   $ctxRef.fill();

  //   $ctxRef.rotate(-angle);
  //   $ctxRef.restore();
  // };

  // const drawSignalLineFromArray = (signalLine) => {
  //   let origin = $snapPoints[signalLine.origin.i];
  //   let end = $snapPoints[signalLine.end.i];
  //   $ctxRef.beginPath();
  //   $ctxRef.lineWidth = signalLine.lineWidth;
  //   $ctxRef.moveTo(origin.x, origin.y);
  //   $ctxRef.lineTo(end.x, end.y);
  //   $ctxRef.strokeStyle = signalLine.backgroundColor;
  //   $ctxRef.stroke();

  //   $showDirectionArrows && drawDirectionArrows(signalLine);
  // };

  // const drawSnapPoint = (point) => {
  //   if (point.hasSquare) {
  //     drawSquare(point);
  //     drawPointLabel(point);
  //     return;
  //   }
  //   $ctxRef.beginPath();
  //   $ctxRef.arc(point.x, point.y, point.radius, 0, 2 * Math.PI, false);
  //   $ctxRef.fillStyle = "darkgrey";
  //   $ctxRef.fill();
  //   $ctxRef.lineWidth = 1;
  //   $ctxRef.strokeStyle = "black";
  //   $ctxRef.stroke();
  // };

  // const drawSquare = (square) => {
  //   $ctxRef.fillStyle = square.backgroundColor;
  //   $ctxRef.fillRect(
  //     square.x - square.width / 2,
  //     square.y - square.width / 2,
  //     square.width,
  //     square.width
  //   );
  //   $ctxRef.lineWidth = 2;
  //   $ctxRef.strokeStyle = square.outlineColor;
  //   $ctxRef.strokeRect(
  //     square.x - square.width / 2,
  //     square.y - square.width / 2,
  //     square.width,
  //     square.width
  //   );
  // };

  // const drawPointLabel = (square) => {
  //   $ctxRef.font = square.width / 2.25 + "px arial";
  //   $ctxRef.textBaseline = "hanging";
  //   $ctxRef.fillStyle = square.fontColor;

  //   let textWidth = $ctxRef.measureText(square.label).width;

  //   $ctxRef.fillText(
  //     square.label,
  //     square.x - textWidth / 2,
  //     square.y - square.width / 4.5
  //   );
  // };

  // const drawDragSelection = (e) => {
  //   $ctxRef.beginPath();
  //   $ctxRef.rect(
  //     $mouseCoordinates.origin.x,
  //     $mouseCoordinates.origin.y,
  //     $mouseCoordinates.end.x - $mouseCoordinates.origin.x,
  //     $mouseCoordinates.end.y - $mouseCoordinates.origin.y
  //   );
  //   $ctxRef.lineWidth = 1;
  //   $ctxRef.strokeStyle = "rgba(255, 0, 0, 1)";
  //   $ctxRef.stroke();
  // };
</script>
