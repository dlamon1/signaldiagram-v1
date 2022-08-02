import { get, writable } from "svelte/store";
import {
  snapPoints,
  signalLines,
  colorState,
  screenAndPanelDimensions,
  updateSignalLines,
  width,
  height,
} from "../store";
import { handleHover, isSnapPointHovered } from "../functions/HandleHover";

export class SignalLines {
  origin = {
    x: null,
    y: null,
    snapPointIndex: null,
    panelIndex: null,
  };
  array = [];

  constructor() {
    this.currentlyDrawing = null;
    this._store = writable(this);
  }

  getOriginCoordinates(d, signalLineIndex, key) {
    // key is either "origin" or "end"
    let signalLine = this.array[signalLineIndex];
    let signalLineClass = get(signalLines);
    let snapPointsClass = get(snapPoints);

    let snapPointIndex = signalLine[key].snapPointIndex;

    let snapPoint = snapPointsClass.array[snapPointIndex];
    let snapPointX = snapPoint.x;
    let snapPointY = snapPoint.y;

    let panelDimension = get(screenAndPanelDimensions).panelDimension;
    let topPadding = get(screenAndPanelDimensions).topPadding;
    let leftPadding = get(screenAndPanelDimensions).leftPadding;

    let panelX = (snapPoint.column * panelDimension * get(width)) / get(height);
    let panelY = snapPoint.row * panelDimension;

    let x = panelX + snapPointX + leftPadding;
    let y = panelY + snapPointY + topPadding;

    return {
      x,
      y,
    };
  }

  setOrigin(e) {
    // console.log(e);
    let panelIndex = e.path[1].__data__.i;
    let panelCoordinates = {
      x: e.path[1].__data__.x,
      y: e.path[1].__data__.y,
    };
    let snapPointIndex = e.path[0].__data__;
    let snapPoint = get(snapPoints).array[snapPointIndex];
    let pointsCoordinates = {
      x: snapPoint.x,
      y: snapPoint.y,
    };
    this.origin.x = panelCoordinates.x + pointsCoordinates.x;
    this.origin.y = panelCoordinates.y + pointsCoordinates.y;
    this.origin.snapPointIndex = snapPointIndex;
    this.origin.panelIndex = panelIndex;
  }

  setCurrentlyDrawing(signalLine) {
    this.currentlyDrawing = signalLine;
  }

  addSignalLine(endIndex) {
    // console.log(endIndex);
    let origin = structuredClone(this.origin);
    let sl = new SignalLine(origin, endIndex);
    this.array.push(sl);
    updateSignalLines();
    this.origin.x = null;
    this.origin.y = null;
  }

  removeSignalLine(line) {
    this.array = this.array.filter((signalLine) => {
      return signalLine.i !== line.i;
    });
  }

  deSelectSignalLines() {
    this.array.forEach((signalLine) => {
      signalLine.isSelected = false;
    });
  }
}

class SignalLine {
  origin = {
    x: 0,
    y: 0,
    snapPointIndex: 0,
  };
  end = {
    x: 0,
    y: 0,
    snapPointIndex: 0,
  };
  color = {
    background: "#000",
  };
  lineWidth = get(screenAndPanelDimensions).panelDimension / 20;
  isSelected = false;

  constructor(origin, e) {
    this.origin = origin;
    this.setEndCoordinates(e);
    this.i = get(signalLines).array.length;
    this.color.background = get(colorState).signalLine.background;
    this.lineWidth = 3;
  }

  selectSignalLine() {
    this.isSelected = true;
    updateSignalLines();
  }

  setEndCoordinates(e) {
    // console.log(e);
    let panel = e.path[1].__data__;
    // console.log(panel);
    let indexOfPoint = e.path[0].__data__;
    let point = get(snapPoints).array[indexOfPoint];
    let coordinatesOfPoint = {
      x: point.x,
      y: point.y,
      radius: point.radius,
    };
    let cooordinatesOfPanel = e.path[1].__data__;

    this.end.x = cooordinatesOfPanel.x + coordinatesOfPoint.x;
    this.end.y = cooordinatesOfPanel.y + coordinatesOfPoint.y;
    this.end.snapPointIndex = indexOfPoint;
    this.end.panelIndex = panel.i;
  }

  updateColor(color) {
    this.backgroundColor = color;
  }

  updateLineWidth(width) {
    this.lineWidth = width;
  }
}
