import { get } from "svelte/store";
import {
  panels as panelsClass,
  snapPoints as snapPointsClass,
  signalLines as signalLinesClass,
  isCtrl,
  selection,
  transform,
} from "../store";

export const handleDragSelect = (event, xOrigin: number, yOrigin: number) => {
  let x1 = event.x;
  let y1 = event.y;
  let x2 = xOrigin;
  let y2 = yOrigin;

  let t = get(transform);

  // using get(transform) apply the transform to the coordinates
  x1 = event.x / t.k - t.x / t.k;
  y1 = event.y / t.k - t.y / t.k;
  x2 = xOrigin / t.k - t.x / t.k;
  y2 = yOrigin / t.k - t.y / t.k;

  // check which objects are selecting
  if (get(selection) === "panels") {
    let indexesOfPanelsInsideSelection = checkForSelectedPanels(x1, y1, x2, y2);
    get(panelsClass).selectPanels(indexesOfPanelsInsideSelection);
    return;
  }

  if (get(selection) === "snappoints") {
    let indexesOfSnapPointsInsideSelection = checkForSelectedSnapPoints(
      x1,
      y1,
      x2,
      y2
    );
    get(snapPointsClass).selectSnapPoints(indexesOfSnapPointsInsideSelection);
    return;
  }

  if (get(selection) === "signallines") {
    let indexesOfSignalLinesInsideSelection = checkForSelectedSignalLines(
      x1,
      y1,
      x2,
      y2
    );
    get(signalLinesClass).selectSignalLines(
      indexesOfSignalLinesInsideSelection
    );
    return;
  }
};

export const checkForSelectedPanels = (
  xOrigin: number,
  yOrigin: number,
  xDestination: number,
  yDestination: number
) => {
  let p = get(panelsClass);
  let panels = p.array;

  let x1: number = null;
  let y1: number = null;
  let x2: number = null;
  let y2: number = null;

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
  xOrigin: number,
  yOrigin: number,
  xDestination: number,
  yDestination: number
) => {
  let x1: number = null;
  let y1: number = null;
  let x2: number = null;
  let y2: number = null;

  xOrigin < xDestination ? (x1 = xOrigin) : (x1 = xDestination);
  yOrigin < yDestination ? (y1 = yOrigin) : (y1 = yDestination);
  xOrigin > xDestination ? (x2 = xOrigin) : (x2 = xDestination);
  yOrigin > yDestination ? (y2 = yOrigin) : (y2 = yDestination);

  let indexesOfSnapPointsInsideSelection = [];

  let sp = get(snapPointsClass);
  let snapPoints = sp.array;

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

  return indexesOfSnapPointsInsideSelection;
};

export const checkForSelectedSignalLines = (
  xOrigin: number,
  yOrigin: number,
  xDestination: number,
  yDestination: number
) => {
  const checkIfPointIsWithinBounds = (snapPointIndex: number) => {
    let snapPoint = get(snapPointsClass).array[snapPointIndex];
    let panel = get(panelsClass).array[snapPoint.panelIndex];
    let panelX = panel.x;
    let panelY = panel.y;

    let point = {
      x: panelX + snapPoint.x,
      y: panelY + snapPoint.y,
    };

    let x1: number = null;
    let y1: number = null;
    let x2: number = null;
    let y2: number = null;
      xOrigin < xDestination ? (x1 = xOrigin) : (x1 = xDestination);
    yOrigin < yDestination ? (y1 = yOrigin) : (y1 = yDestination);
    xOrigin > xDestination ? (x2 = xOrigin) : (x2 = xDestination);
    yOrigin > yDestination ? (y2 = yOrigin) : (y2 = yDestination);

    if (point.x >= x1 && point.x <= x2 && point.y >= y1 && point.y <= y2) {
      return true;
    }
    return false;
  };

  let _signalLines = [];

  if (get(isCtrl)) {
    // _signalLines.push(...get(selectedSignalLines));
  }

  get(signalLinesClass).array.forEach((line, i) => {
    if (
      checkIfPointIsWithinBounds(line.origin.snapPointIndex) &&
      checkIfPointIsWithinBounds(line.destination.snapPointIndex)
    ) {
      _signalLines.push(i);
    }
  });

  return _signalLines;
};
