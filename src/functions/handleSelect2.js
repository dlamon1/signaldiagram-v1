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
} from "../store";

import { focusLabelInput } from "./focusInput";

export const handleDragSelect = (e) => {
  // TODO
  // check what objects we are selecting
  if (isSelectingPanels) {
  }
  // convert coordinates from zoom transform
  // compary coordinated to objects
  // set is selected for each object within the selection
};
