import { get } from "svelte/store";
import {
  snapPoints,
  mouseCoordinates,
  signalLines,
  colorState,
  setSignalLines,
} from "../store";
import { handleHover, isSnapPointHovered } from "../functions/HandleHover";

export class SignalLines {
  origin = {
    x: null,
    y: null,
  };

  constructor() {
    this.array = [];
    this.currentlyDrawing = null;
  }

  setOrigin(e) {
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
  }

  setCurrentlyDrawing(signalLine) {
    this.currentlyDrawing = signalLine;
  }

  addSignalLine(endIndex) {
    let origin = structuredClone(this.origin);
    let sl = new SignalLine(origin, endIndex);
    this.array.push(sl);
    setSignalLines();
    this.origin.x = null;
    this.origin.y = null;
  }

  removeSignalLine(line) {
    this.array = this.array.filter((signalLine) => {
      return signalLine.i !== line.i;
    });
  }
}

class SignalLine {
  origin = {
    x: 0,
    y: 0,
  };
  end = {
    x: 0,
    y: 0,
  };
  color = {
    background: "#000",
  };
  lineWidth = 3;

  constructor(origin, e) {
    this.origin = origin;
    this.setEndCoordinates(e);
    this.i = get(signalLines).array.length;
    this.color.background = get(colorState).signalLine.background;
    this.lineWidth = 3;
  }

  setEndCoordinates(e) {
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
  }

  updateColor(color) {
    this.backgroundColor = color;
  }

  updateLineWidth(width) {
    this.lineWidth = width;
  }
}
