import { get } from "svelte/store";
import {
  panels as panelsClass,
  snapPoints as snapPointsClass,
  signalLines as signalLinesClass,
  selection,
  transform,
} from "../store";

import { focusLabelInput } from "./focusInput";

import {
  checkForSelectedPanels,
  checkForSelectedSnapPoints,
} from "./HandleSelect";

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
    return;
  }

  // set is selected for each object within the selection
};
