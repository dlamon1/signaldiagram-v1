import { get, derived } from "svelte/store";
import {
  panels,
  snapPoints,
  signalLines,
  squares,
  isSelectingPanels,
  isSelectingSignalLines,
  isSelectingSnapPoints,
} from "../store";

export const handleHover = (e) => {
  console.log("hover");
  let _panels = get(panels);
  let _snapPoints = get(snapPoints);
  let _signalLines = get(signalLines);
  let _squares = get(squares);
  let _isSelectingPanels = get(isSelectingPanels);
  let _isSelectingSignalLines = get(isSelectingSignalLines);
  let _isSelectingSnapPoints = get(isSelectingSnapPoints);

  let res = {
    hoveredPanels: [],
    hoveredSignalLines: [],
    hoveredSnapPoints: [],
    hoveredSquares: [],
  };

  _squares.forEach((square, i) => {
    if (!square.isOn) return;
    if (isSquareHovered(e, square)) res.hoveredSquares.push(square);
  });

  if (res.hoveredSquares.length > 0) return res;

  _snapPoints.forEach((snapPoint) => {
    if (isSnapPointHovered(e, snapPoint)) res.hoveredSnapPoints.push(snapPoint);
  });

  if (res.hoveredSnapPoints.length > 0 && _isSelectingSnapPoints) return res;

  _signalLines.array.forEach((signalLine) => {
    if (isSignalLineHovered(e, signalLine))
      res.hoveredSignalLines.push(signalLine);
  });

  if (res.hoveredSignalLines.length > 0 && _isSelectingSignalLines) return res;

  _panels.forEach((panel, i) => {
    if (isPanelHovered(e, panel)) res.hoveredPanels.push(panel);
  });

  // console.log(res.hoveredSquares);

  return res;
};

export const isSignalLineHovered = (e, line) => {
  let mousePosition = { x: e.offsetX, y: e.offsetY };
  let p1 = {
    x: get(snapPoints)[line.origin.i].x,
    y: get(snapPoints)[line.origin.i].y,
  };
  let p2 = {
    x: get(snapPoints)[line.end.i].x,
    y: get(snapPoints)[line.end.i].y,
  };

  function calcIsInsideThickLineSegment(line1, line2, pnt, lineThickness) {
    let L2 =
      (line2.x - line1.x) * (line2.x - line1.x) +
      (line2.y - line1.y) * (line2.y - line1.y);
    if (L2 == 0) return false;
    let r =
      ((pnt.x - line1.x) * (line2.x - line1.x) +
        (pnt.y - line1.y) * (line2.y - line1.y)) /
      L2;

    //Assume line thickness is circular
    if (r < 0) {
      //Outside line1
      return (
        Math.sqrt(
          (line1.x - pnt.x) * (line1.x - pnt.x) +
            (line1.y - pnt.y) * (line1.y - pnt.y)
        ) <= lineThickness
      );
    } else if (0 <= r && r <= 1) {
      //On the line segment
      let s =
        ((line1.y - pnt.y) * (line2.x - line1.x) -
          (line1.x - pnt.x) * (line2.y - line1.y)) /
        L2;
      return Math.abs(s) * Math.sqrt(L2) <= lineThickness;
    } else {
      //Outside line2
      return (
        Math.sqrt(
          (line2.x - pnt.x) * (line2.x - pnt.x) +
            (line2.y - pnt.y) * (line2.y - pnt.y)
        ) <= lineThickness
      );
    }
  }

  return calcIsInsideThickLineSegment(p1, p2, mousePosition, 10);
};

export const isSnapPointHovered = (e, point) => {
  let x = e.offsetX;
  let y = e.offsetY;

  if (
    point.x - point.panelWidth / 7 < x &&
    x < point.x + point.panelWidth / 7 &&
    point.y - point.panelHeight / 7 < y &&
    y < point.y + point.panelHeight / 7
  ) {
    return true;
  }
  return false;
};

export const isSquareHovered = (e, square) => {
  let x = e.offsetX;
  let y = e.offsetY;

  if (
    square.x - square.width / 2 < x &&
    x < square.x + square.width / 2 &&
    square.y - square.width / 2 < y &&
    y < square.y + square.width / 2 &&
    square.isOn
  ) {
    return true;
  }
  // console.log('false');
  return false;
};

export const isPanelHovered = (e, panel) => {
  console.log("handle panel hover");
  let x = e.offsetX;
  let y = e.offsetY;
  if (
    panel.x < x &&
    x < panel.x + panel.width &&
    panel.y < y &&
    y < panel.y + panel.height
  ) {
    return true;
  }
  return false;
};
