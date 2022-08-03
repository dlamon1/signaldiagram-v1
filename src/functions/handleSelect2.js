import { get } from "svelte/store";
import {
  panels,
  snapPoints,
  signalLines,
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
  selection,
  transform,
} from "../store";

import { focusLabelInput } from "./focusInput";

import { checkForSelectedPanels } from "./HandleSelect";

export const handleDragSelect = (event, xOrigin, yOrigin) => {
  // TODO
  // convert coordinates from zoom transform
  // set the selection coordinates
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

  // check what objects we are selecting
  if (get(selection) === "panels") {
    let indexesOfPanelsInsideSelection = checkForSelectedPanels(x1, y1, x2, y2);
    get(panels).selectPanels(indexesOfPanelsInsideSelection);
    return;
  }

  if (get(selection) === "signallines") {
    console.log("signal lines");
    return;
  }

  if (get(selection) === "snappoints") {
    console.log("snap points");
    return;
  }

  // set is selected for each object within the selection
};
