import { get } from "svelte/store";
import {
  snapPoints,
  mouseCoordinates,
  signalLines,
  colorState,
} from "../store";
import { handleHover, isSnapPointHovered } from "../functions/HandleHover";

export class SignalLines {
  constructor() {
    this.array = [];
    this.hoveredArray = [];
    this.currentlyDrawing = null;
  }

  setCurrentlyDrawing(signalLine) {
    this.currentlyDrawing = signalLine;
  }

  addSignalLine() {
    this.array.push(new SignalLine());
  }

  removeSignalLine(line) {
    this.array = this.array.filter((signalLine) => {
      return signalLine.i !== line.i;
    });
  }
}

class SignalLine {
  constructor() {
    let m = get(mouseCoordinates);
    this.origin = m.closestSnapPoint.origin;
    this.end = m.closestSnapPoint.end;
    this.i = get(signalLines).array.length;
    this.backgroundColor = get(colorState).signalLine.background;
    this.lineWidth = 3;
  }

  updateColor(color) {
    this.backgroundColor = color;
  }

  updateLineWidth(width) {
    this.lineWidth = width;
  }
}
