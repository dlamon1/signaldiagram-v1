import { get, writable } from "svelte/store";
import {
  snapPoints,
  signalLines,
  colorState,
  updateSnapPoints,
  updateSignalLines,
  width,
  height,
  panels,
  isCtrl,
  setSelection,
  updatePanels,
} from "../store";

import * as d3 from "d3";

export class SignalLines {
  origin = {
    x: null,
    y: null,
    snapPointIndex: null,
    panelIndex: null,
  };
  destination = {
    snapPointIndex: null,
  };
  mouse = {
    x: null,
    y: null,
  };
  array = [];

  constructor() {
    this.currentlyDrawing = null;
    this._store = writable(this);
  }

  setArrayFromLoad(snapPointsArray) {
    console.log(snapPointsArray);
  }

  getOriginCoordinates(d, signalLineIndex, key) {
    // key is either "origin" or "destination"
    let signalLine = this.array[signalLineIndex];
    let signalLineClass = get(signalLines);
    let snapPointsClass = get(snapPoints);

    let snapPointIndex = signalLine[key].snapPointIndex;

    let snapPoint = snapPointsClass.array[snapPointIndex];
    // console.log(snapPoint);
    let snapPointX = snapPoint.x;
    let snapPointY = snapPoint.y;

    let panelX = snapPoint.column * get(width);
    let panelY = snapPoint.row * get(height);

    let x = panelX + snapPointX;
    let y = panelY + snapPointY;

    return {
      x,
      y,
    };
  }

  getPanelIndex(row, column) {
    let p = get(panels).array;
    // iterate over array of and return p.i where p.row === row && p.column === column
    for (let i = 0; i < p.length; i++) {
      if (p[i].row === row && p[i].column === column) {
        return i;
      }
    }
  }

  nullDestinationSnapPointIndex() {
    this.destination.snapPointIndex = null;
  }

  setOriginSnapPointIndex(e) {
    // console.log(e);
    let obj = e.path[0].__data__;

    let panelIndex = this.getPanelIndex(obj.row, obj.column);

    let snapPointIndex = obj.pointIndexFullArray;
    let snapPoint = get(snapPoints).array[snapPointIndex];

    this.origin.snapPointIndex = snapPointIndex;
    this.origin.panelIndex = panelIndex;
    this.notify();
    updateSignalLines();
    // console.log(this.origin);
  }

  nullOriginAndDestinationValues() {
    this.origin.snapPointIndex = null;
    this.origin.panelIndex = null;
    this.destination.snapPointIndex = null;
  }

  setDestinationSnapPointIndex(d3SnapPointObj) {
    let snapPoint = d3SnapPointObj.path[0].__data__;
    this.destination.snapPointIndex = snapPoint.pointIndexFullArray;
    updateSignalLines();
  }

  setMousePosition(e) {
    // console.log(e);
    this.mouse.x = e.x;
    this.mouse.y = e.y;
    updateSignalLines();
  }

  setCurrentlyDrawing(signalLine) {
    this.currentlyDrawing = signalLine;
  }

  addSignalLine() {
    let origin = structuredClone(this.origin);
    if (!this.destination.snapPointIndex) {
      return;
    }
    let sl = new SignalLine(origin, this.destination.snapPointIndex);
    this.array.push(sl);
    this.origin.x = null;
    this.origin.y = null;
    this.nullOriginAndDestinationValues();
    updateSignalLines();
    updatePanels();
  }

  removeSignalLine(line) {
    this.array = this.array.filter((signalLine) => {
      return signalLine.i !== line.i;
    });
  }

  selectSignalLine(i) {
    let snapPointsClass = get(snapPoints);
    let panelsClass = get(panels);

    snapPointsClass.deSelect();
    panelsClass.deSelect();
    updatePanels();

    let current = this.array[i].isSelected;

    if (!get(isCtrl)) {
      this.array.forEach((sl) => sl.setIsSelected(false));
      this.array[i].setIsSelected(!current);
    }
    this.array[i].setIsSelected(!current);

    setSelection("signallines");

    // console.log(this.array
    updateSignalLines();
  }

  selectSignalLines(arrayOfIndexes) {
    let snapPointsClass = get(snapPoints);
    let signalLinesClass = get(signalLines);
    snapPointsClass.deSelect();
    signalLinesClass.deSelect();
    updateSnapPoints();
    updateSignalLines();

    if (!get(isCtrl)) {
      this.array.forEach((line) => {
        line.setIsSelected(false);
      });
    }

    arrayOfIndexes.forEach((i) => {
      this.array[i].setIsSelected(true);
    });

    updateSnapPoints();
  }

  deSelect() {
    this.array.forEach((signalLine) => {
      signalLine.setIsSelected(false);
    });
    updateSignalLines();
  }

  notify() {
    this._store.set(this);
  }

  subscribe(subscriber) {
    return this._store.subscribe(subscriber);
  }
}

class SignalLine {
  origin = {
    x: 0,
    y: 0,
    snapPointIndex: null,
    panelIndex: null,
  };
  end = {
    x: 0,
    y: 0,
    snapPointIndex: null,
    panelIndex: null,
  };
  destination = {
    snapPointIndex: null,
  };
  color = {
    background: "#0f0",
    // background: "#000",
  };

  lineWidth = 8;
  isSelected = false;

  constructor(origin, destinationSnapPointIndex) {
    this.origin.snapPointIndex = origin.snapPointIndex;
    this.origin.panelIndex = origin.panelIndex;
    this.destination.snapPointIndex = destinationSnapPointIndex; // this.origin = origin;
    this.i = get(signalLines).array.length;
    this.color.background = get(colorState).signalLine.background;
    this.lineWidth =
      get(width) < get(height) ? get(width) / 20 : get(height) / 20;
  }

  setIsSelected(boolean) {
    // console.log("setIsSelected");
    this.isSelected = boolean;
    updateSignalLines();
  }

  setEndCoordinates(e) {
    let panel = e.path[1].__data__;
    let indexOfPoint = e.path[0].__data__;
    let point = get(snapPoints).array[indexOfPoint];

    this.destination.snapPointIndex = indexOfPoint;
    this.destination.panelIndex = panel.i;
  }

  updateColor(color) {
    console.log("update color");
    this.color.background = color;
  }

  updateLineWidth(width) {
    this.lineWidth = width;
  }
}
