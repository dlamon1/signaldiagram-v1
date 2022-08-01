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
} from "../store";

import { focusLabelInput } from "./focusInput";

import {
  isSnapPointHovered,
  isSquareHovered,
  isPanelHovered,
  isSignalLineHovered,
} from "./HandleHover";

export const handlePanelClick = (e) => {
  let i = e.target.__data__.i;
  let _panels = get(panels).array;
  // console.log(_panels);
  let current = _panels[i].isSelected;

  if (!get(isCtrl)) {
    _panels.forEach((p) => p.setIsSelected(false));
    _panels[i].setIsSelected(!current);
  }
  _panels[i].setIsSelected(!current);
  // _panels[i].setIsSelected(!_panels[i].isSelected);
  // setPanels(_panels);
  updatePanels();
};

export const handleSnapPointClick = (e) => {
  let i = e.path[0].__data__.pointIndexFullArray;

  let points = get(snapPoints);

  if (!get(isCtrl)) {
    points.forEach((p) => (p.isSelected = false));
  }

  points[i].toggleIsSelected();
  // setSnapPoints(points);
  // console.log(i);
};

let originIndex = 0;

export const handleSnapPointStart = (e) => {
  let snapPointIndex = e.path[0].__data__.pointIndexFullArray;
  originIndex = snapPointIndex;
};

export const handleSnapPointEnd = (e) => {
  let snapPointIndex = e.path[0].__data__.pointIndexFullArray;
  get(signalLines).addSignalLine(originIndex, snapPointIndex);
};

export const clearSelectedPanels = (e) => {
  let _panels = get(panels);
  // console.log(_panels.array);
  _panels.array.forEach((p) => (p.isSelected = false));
  setPanels(_panels);
};

export const handleMouseClickSelect = (e) => {
  let res = {
    panelsSelected: [],
    signalLinesSelected: [],
    snapPointsSelected: [],
    squaresSelected: [],
  };

  let _panels = get(panels);
  let _snapPoints = get(snapPoints);
  let _signalLines = get(signalLines).array;
  let _squares = get(squares);

  let _selectedPanels = get(selectedPanels);
  let _selectedSignalLines = get(selectedSignalLines);
  let _selectedSnapPoints = get(selectedSnapPoints);
  let _selectedSquares = get(selectedSquares);

  let _isSelectingPanels = get(isSelectingPanels);
  let _isSelectingSignalLines = get(isSelectingSignalLines);
  let _isSelectingSnapPoints = get(isSelectingSnapPoints);

  clearAllSelections();

  if (get(isCtrl)) res.squaresSelected.push(..._selectedSquares);

  _squares.forEach((square) => {
    if (isSquareHovered(e, square)) res.squaresSelected.push(square);
  });

  focusLabelInput();

  if (res.squaresSelected.length > 0) return res;

  if (get(isCtrl)) res.snapPointsSelected.push(..._selectedSnapPoints);

  _isSelectingSnapPoints &&
    _snapPoints.forEach((snapPoint, i) => {
      if (isSnapPointHovered(e, snapPoint))
        res.snapPointsSelected.push(snapPoint);
    });

  if (res.snapPointsSelected.length > 0) return res;

  if (get(isCtrl)) res.signalLinesSelected.push(..._selectedSignalLines);

  _isSelectingSignalLines &&
    _signalLines.forEach((signalLine, i) => {
      if (isSignalLineHovered(e, signalLine))
        res.signalLinesSelected.push(signalLine);
    });

  if (res.signalLinesSelected.length > 0) return res;

  if (get(isCtrl)) res.panelsSelected.push(..._selectedPanels);

  _isSelectingPanels &&
    _panels.forEach((panel, i) => {
      if (isPanelHovered(e, panel)) res.panelsSelected.push(panel);
    });

  return res;
};

export const checkForSelectedPanels = (e) => {
  let mouse = get(mouseCoordinates);

  let x1;
  let y1;
  let x2;
  let y2;
  e.offsetX < mouse.origin.x ? (x1 = e.offsetX) : (x1 = mouse.origin.x);
  e.offsetY < mouse.origin.y ? (y1 = e.offsetY) : (y1 = mouse.origin.y);
  e.offsetX > mouse.origin.x ? (x2 = e.offsetX) : (x2 = mouse.origin.x);
  e.offsetY > mouse.origin.y ? (y2 = e.offsetY) : (y2 = mouse.origin.y);

  let a = [];

  get(panels).forEach((panel, i) => {
    if (get(isCtrl)) {
      a.push(...get(selectedPanels));
    }

    if (
      panel.x >= x1 &&
      panel.x + panel.width <= x2 &&
      panel.y >= y1 &&
      panel.y + panel.height <= y2
    ) {
      a.push(panel);
    }
  });

  return a;
};

export const checkForSelectedSnapPoints = (e) => {
  let mouse = get(mouseCoordinates);

  let x1;
  let y1;
  let x2;
  let y2;
  e.offsetX < mouse.origin.x ? (x1 = e.offsetX) : (x1 = mouse.origin.x);
  e.offsetY < mouse.origin.y ? (y1 = e.offsetY) : (y1 = mouse.origin.y);
  e.offsetX > mouse.origin.x ? (x2 = e.offsetX) : (x2 = mouse.origin.x);
  e.offsetY > mouse.origin.y ? (y2 = e.offsetY) : (y2 = mouse.origin.y);

  let _snapPoints = [];
  let _squares = [];
  let _signalLines = [];

  get(snapPoints).forEach((snapPoint, i) => {
    if (get(isCtrl)) {
      _snapPoints.push(...get(selectedSnapPoints));
    }

    if (
      snapPoint.x >= x1 &&
      snapPoint.x <= x2 &&
      snapPoint.y >= y1 &&
      snapPoint.y <= y2
    ) {
      _snapPoints.push(snapPoint);
    }
  });

  get(squares).forEach((square, i) => {
    if (get(isCtrl)) {
      _squares.push(...get(selectedSquares));
    }

    if (!square.isOn) return;

    if (square.x >= x1 && square.x <= x2 && square.y >= y1 && square.y <= y2) {
      _squares.push(square);
    }
  });

  return {
    snapPoints: _snapPoints,
    squares: _squares,
  };
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
      checkIfPointIsWithinBounds(line.end)
    ) {
      _signalLines.push(line);
    }
  });

  return {
    signalLines: _signalLines,
  };
};
