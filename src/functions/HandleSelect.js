import { get } from "svelte/store";
import {
  panels as panelsClass,
  snapPoints as snapPointsClass,
  signalLines as signalLinesClass,
  isSelectingPanels,
  isSelectingSignalLines,
  isSelectingSnapPoints,
  selectedPanels,
  selectedSnapPoints,
  selectedSignalLines,
  selectedSquares,
  squares,
  isCtrl,
  clearAllSelections,
  mouseCoordinates,
  setPanels,
  setSnapPoints,
  updatePanels,
  updateSnapPoints,
} from "../store";

export const checkForSelectedPanels = (
  xOrigin,
  yOrigin,
  xDestination,
  yDestination
) => {
  let p = get(panelsClass);
  let panels = p.array;

  let x1;
  let y1;
  let x2;
  let y2;

  xOrigin < xDestination ? (x1 = xOrigin) : (x1 = xDestination);
  yOrigin < yDestination ? (y1 = yOrigin) : (y1 = yDestination);
  xOrigin > xDestination ? (x2 = xOrigin) : (x2 = xDestination);
  yOrigin > yDestination ? (y2 = yOrigin) : (y2 = yDestination);

  let indexesOfPanelsInsideSelection = [];

  panels.forEach((panel, i) => {
    if (
      panel.x >= x1 &&
      panel.x + panel.width <= x2 &&
      panel.y >= y1 &&
      panel.y + panel.height <= y2
    ) {
      indexesOfPanelsInsideSelection.push(panel.i);
    }
  });

  return indexesOfPanelsInsideSelection;
};

export const checkForSelectedSnapPoints = (
  xOrigin,
  yOrigin,
  xDestination,
  yDestination
) => {
  console.log("here");
  let x1;
  let y1;
  let x2;
  let y2;

  xOrigin < xDestination ? (x1 = xOrigin) : (x1 = xDestination);
  yOrigin < yDestination ? (y1 = yOrigin) : (y1 = yDestination);
  xOrigin > xDestination ? (x2 = xOrigin) : (x2 = xDestination);
  yOrigin > yDestination ? (y2 = yOrigin) : (y2 = yDestination);

  let indexesOfSnapPointsInsideSelection = [];

  let sp = get(snapPointsClass);
  let snapPoints = sp.array;
  // let _squares = [];
  // let _signalLines = [];

  snapPoints.forEach((snapPoint, i) => {
    if (
      sp.getXCoordinate(snapPoint) >= x1 &&
      sp.getXCoordinate(snapPoint) <= x2 &&
      sp.getYCoordinate(snapPoint) >= y1 &&
      sp.getYCoordinate(snapPoint) <= y2
    ) {
      indexesOfSnapPointsInsideSelection.push(i);
    }
  });

  // get(squares).forEach((square, i) => {
  //   if (get(isCtrl)) {
  //     _squares.push(...get(selectedSquares));
  //   }

  //   if (!square.isOn) return;

  //   if (square.x >= x1 && square.x <= x2 && square.y >= y1 && square.y <= y2) {
  //     _squares.push(square);
  //   }
  // });

  return indexesOfSnapPointsInsideSelection;
};

export const checkForSelectedSignalLines = (e) => {
  const checkIfPointIsWithinBounds = (point) => {
    let x1;
    let y1;
    let x2;
    let y2;
    e.offsetX < mouse.origin.x ? (x1 = e.offsetX) : (x1 = mouse.origin.x);
    e.offsetY < mouse.origin.y ? (y1 = e.offsetY) : (y1 = mouse.origin.y);
    e.offsetX > mouse.origin.x ? (x2 = e.offsetX) : (x2 = mouse.origin.x);
    e.offsetY > mouse.origin.y ? (y2 = e.offsetY) : (y2 = mouse.origin.y);

    if (point.x >= x1 && point.x <= x2 && point.y >= y1 && point.y <= y2) {
      return true;
    }
    return false;
  };

  let mouse = get(mouseCoordinates);

  let _signalLines = [];

  get(signalLines).array.forEach((line, i) => {
    if (get(isCtrl)) {
      _signalLines.push(...get(selectedSignalLines));
    }

    if (
      checkIfPointIsWithinBounds(line.origin) &&
      checkIfPointIsWithinBounds(line.destination)
    ) {
      _signalLines.push(line);
    }
  });

  return {
    signalLines: _signalLines,
  };
};
