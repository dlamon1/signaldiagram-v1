import { get, derived } from "svelte/store";
import { handleHover } from "../HandleHover";

import {
  isShifted,
  setERef,
  isSelectMode,
  isDrawMode,
  mouseCoordinates,
  updateMouseCoordinates,
  setHoveredSnapPoints,
  isMouseDown,
  setHoveredPanels,
  setHoveredSignalLines,
  setHoveredSquares,
} from "../../store";

export const handleMouseMove = (e) => {
  setERef(e);

  let m = get(mouseCoordinates);

  if (get(isDrawMode) && get(isMouseDown)) {
    m.setMouseEnd(e);
  }

  if (get(isDrawMode)) {
    let res = handleHover(e);

    // if (get(hoveredSnapPoints) == res.hoveredSnapPoints) return;

    setHoveredSnapPoints(res.hoveredSnapPoints);
    return;
  }

  if (get(isShifted) && get(isMouseDown) && get(isSelectMode)) {
    // console.log('c');
    // console.log(m.isDragging);

    m.setMouseEnd(e);
    m.setIsDrawingSignalLine(false);
    updateMouseCoordinates();

    // m.setIsDragging(true);
  } else if (get(isSelectMode)) {
    console.log("d");
    requestAnimationFrame(() => {
      let res = handleHover(e);

      setHoveredSignalLines(res.hoveredSignalLines);

      setHoveredSnapPoints(res.hoveredSnapPoints);

      setHoveredPanels(res.hoveredPanels);

      setHoveredSquares(res.hoveredSquares);
    });
  }
};
