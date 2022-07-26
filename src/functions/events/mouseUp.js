import { get, derived } from "svelte/store";

import {
  isShifted,
  setIsMouseDown,
  setERef,
  isSelectMode,
  isDrawMode,
  mouseCoordinates,
  selection,
  setSelectedPanels,
  setSelectedSnapPoints,
  setSelectedSquares,
  setSelectedSignalLines,
  signalLines,
  setSignalLines,
  updateMouseCoordinates,
  setSelectionTab,
  clearAllSelections,
} from "../../store";

import {
  checkForSelectedPanels,
  checkForSelectedSnapPoints,
  checkForSelectedSignalLines,
} from "../HandleSelect";

export const handleMouseUp = (e) => {
  let m = get(mouseCoordinates);

  m.setMouseEnd(e);
  m.setIsDragging(false);

  setERef(e);

  if (get(isDrawMode)) {
    handleNewSignalLine(e);

    setIsMouseDown(false);

    m.setIsDrawingSignalLine(false);

    updateMouseCoordinates();
    return;
  }

  if (get(isShifted) && get(isSelectMode)) {
    let s = get(selection);

    clearAllSelections();

    if (s === "panels") {
      let res = checkForSelectedPanels(e);
      setSelectedPanels(res);
      setSelectionTab("panels");
    }
    // TODO handle these selections
    if (s === "snappoints") {
      let res = checkForSelectedSnapPoints(e);
      setSelectedSnapPoints(res.snapPoints);
      setSelectedSquares(res.squares);
      setSelectionTab("squares");
    }
    if (s === "signallines") {
      let res = checkForSelectedSignalLines(e);
      setSelectedSignalLines(res.signalLines);
      setSelectionTab("lines");
    }
    // $selection === "signallines" && selectContainingSignalLines(e);
  }

  updateMouseCoordinates();
  setIsMouseDown(false);
  return;
};

const handleNewSignalLine = (e) => {
  let m = get(mouseCoordinates);

  // set the signal line endpoint
  m.setSnapPointEnd(e);

  if (
    m.closestSnapPoint.origin.x &&
    m.closestSnapPoint.end.x &&
    checkOriginAndEndpointAreUnique(m.closestSnapPoint)
  ) {
    get(signalLines).addSignalLine();
    setSignalLines();
  }

  m.resetSnapPoint();
};

const checkOriginAndEndpointAreUnique = (point) => {
  if (point.origin.x === point.end.x && point.origin.y === point.end.y) {
    return false;
  }
  return true;
};
