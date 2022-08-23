import { get } from "svelte/store";
import {
  panels as panelsClass,
  snapPoints as snapPointsClass,
  signalLines as signalLinesClass,
  selectedSignalLines,
  isCtrl,
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
   xOrigin,
  yOrigin,
  xDestination,
  yDestination) => {
  const checkIfPointIsWithinBounds = (snapPointIndex) => {

    let snapPoint = get(snapPointsClass).array[snapPointIndex];
    console.log(snapPoint)
    let point 

    let x1;
    let y1;
    let x2;
    let y2;
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
    _signalLines.push(...get(selectedSignalLines));
  }
  
  get(signalLinesClass).array.forEach((line, i) => {
    i === 0 && console.log(line)
    if (
      checkIfPointIsWithinBounds(line.origin.snapPointIndex) &&
      checkIfPointIsWithinBounds(line.destination.snapPointIndex)
    ) {
      _signalLines.push(line);
    }
  });

  return {
    signalLines: _signalLines,
  };
};
