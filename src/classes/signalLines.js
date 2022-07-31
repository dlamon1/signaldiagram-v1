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
  constructor() {
    this.array = [];
    this.currentlyDrawing = null;
  }

  setCurrentlyDrawing(signalLine) {
    this.currentlyDrawing = signalLine;
  }

  addSignalLine(originIndex, endIndex) {
    this.array.push(new SignalLine(originIndex, endIndex));
    setSignalLines();
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

  constructor(originIndex, endIndex) {
    this.setCoordinates(originIndex, endIndex);
    this.i = get(signalLines).array.length;
    this.backgroundColor = get(colorState).signalLine.background;
    this.lineWidth = 3;
  }

  setCoordinates(originIndex, endIndex) {
    let _snapPoints = get(snapPoints);
    // console.log(_snapPoints);
    let originSnapPoint = _snapPoints[originIndex];
    this.origin.x = originSnapPoint.x;
    this.origin.y = originSnapPoint.y;

    let endSnapPoint = _snapPoints[endIndex];
    this.end.x = endSnapPoint.x;
    this.end.y = endSnapPoint.y;
  }

  updateColor(color) {
    this.backgroundColor = color;
  }

  updateLineWidth(width) {
    this.lineWidth = width;
  }
}
