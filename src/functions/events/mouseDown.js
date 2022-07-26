import { get, derived } from "svelte/store";

import { focusLabelInput } from "../focusInput";

import {
  isShifted,
  setIsMouseDown,
  setERef,
  isSelectMode,
  isDrawMode,
  mouseCoordinates,
  setSelectedPanels,
  setSelectedSnapPoints,
  setSelectedSquares,
  setSelectionTab,
  setSelectedSignalLines,
  setSelection,
  colorState,
  setColorState,
} from "../../store";

import { handleMouseClickSelect } from "../HandleSelect";

export const handleMouseDown = async (e) => {
  let m = get(mouseCoordinates);

  setERef(e);
  setIsMouseDown(true);
  m.setIsDrawingSignalLine(false);
  m.setIsDragging(false);
  m.setSnapPointOrigin(e);
  m.setMouseClickOrigin(e);

  // console.log("here");

  if (get(isDrawMode)) {
    m.setIsDrawingSignalLine(true);
    return;
  }

  if (get(isShifted) && get(isSelectMode)) {
    m.setMouseClickOrigin(e);
    m.setIsDragging(true);
  }

  if (!get(isShifted) && get(isSelectMode)) {
    let res = handleMouseClickSelect(e);

    setSelectedSquares(res.squaresSelected);
    setSelectedSignalLines(res.signalLinesSelected);
    setSelectedPanels(res.panelsSelected);
    setSelectedSnapPoints(res.snapPointsSelected);

    if (res.panelsSelected.length > 0) {
      // setColorState("panel.background", res.panelsSelected[0].backgroundColor);
      setSelectionTab("panels");
      setSelection("panels");
    }

    if (res.signalLinesSelected.length > 0) {
      setSelectionTab("lines");
      setSelection("signallines");
      // setColorState();
    }
    if (res.snapPointsSelected.length > 0) {
      setSelectionTab("squares");
      setSelection("snappoints");
    }
    if (res.squaresSelected.length > 0) {
      setSelectionTab("squares");
      setSelection("snappoints");
    }
  }
};
