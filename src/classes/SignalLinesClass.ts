import { get } from "svelte/store";

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

import type {
  LoadSignalLineObj,
  SignalLineObj,
  SignalLinesType,
  SnapPointCoordinates,
  SnapPointCoordinatesKey,
  XYCoordinates,
} from "../Types/ClassTypes";

export class SignalLines implements SignalLinesType {
  array = [];

  origin = {
    x: null,
    y: null,
    snapPointIndex: null,
    panelIndex: null,
  };

  destination = {
    x: null,
    y: null,
    snapPointIndex: null,
    panelIndex: null,
  };

  mouse = {
    x: null,
    y: null,
  };

  setArrayFromLoad(signaLineArray: LoadSignalLineObj[]) {
    this.array = [];

    signaLineArray.forEach((signalLine, i) => {
      const newLine = new SignalLine(
        signalLine.origin,
        signalLine.destination.snapPointIndex
      );
      this.array.push(newLine);
      const thisLine = this.array[i];
      thisLine.updateColor(signalLine.color.background);
    });
  }

  getSnapPointCoordinates(
    signalLineIndex: number,
    key: SnapPointCoordinatesKey
  ) {
    const signalLine = this.array[signalLineIndex];
    const snapPointsClass = get(snapPoints);

    const snapPointIndex = signalLine[key].snapPointIndex;

    const snapPoint = snapPointsClass.array[snapPointIndex];

    const snapPointX = snapPoint.getX();
    const snapPointY = snapPoint.getY();

    const x = snapPointX;
    const y = snapPointY;

    return {
      x,
      y,
    };
  }

  getPanelIndex(row: number, column: number) {
    const p = get(panels).array;

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
    const obj = e.path[0].__data__;

    const panelIndex = this.getPanelIndex(obj.row, obj.column);

    const snapPointIndex = obj.pointIndexFullArray;

    this.origin.snapPointIndex = snapPointIndex;
    this.origin.panelIndex = panelIndex;
    updateSignalLines();
  }

  nullOriginAndDestinationValues() {
    this.origin.snapPointIndex = null;
    this.origin.panelIndex = null;
    this.destination.snapPointIndex = null;
  }

  setDestinationSnapPointIndex(d3SnapPointObj) {
    const snapPoint = d3SnapPointObj.path[0].__data__;
    this.destination.snapPointIndex = snapPoint.pointIndexFullArray;
    updateSignalLines();
  }

  setMousePosition(e: XYCoordinates) {
    this.mouse.x = e.x;
    this.mouse.y = e.y;
    updateSignalLines();
  }

  addSignalLine() {
    const origin = structuredClone(this.origin);
    if (!this.destination.snapPointIndex) {
      return;
    }
    const sl = new SignalLine(origin, this.destination.snapPointIndex);
    this.array.push(sl);
    this.origin.x = null;
    this.origin.y = null;
    this.nullOriginAndDestinationValues();
    updateSignalLines();
    updatePanels();
  }

  removeSignalLine(line: SignalLineObj) {
    this.array = this.array.filter((signalLine) => {
      return signalLine.i !== line.i;
    });
  }

  selectSignalLine(i: number) {
    const snapPointsClass = get(snapPoints);
    const panelsClass = get(panels);

    snapPointsClass.deSelect();
    panelsClass.deSelect();
    updatePanels();

    const current = this.array[i].isSelected;

    if (!get(isCtrl)) {
      this.array.forEach((sl) => sl.setIsSelected(false));
      this.array[i].setIsSelected(!current);
    }
    this.array[i].setIsSelected(!current);

    setSelection("signallines");

    updateSignalLines();
  }

  selectSignalLines(arrayOfIndexes: number[]) {
    const snapPointsClass = get(snapPoints);
    const signalLinesClass = get(signalLines);
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
}

class SignalLine implements SignalLineObj {
  origin = {
    x: 0,
    y: 0,
    snapPointIndex: 0,
    panelIndex: 0,
  };
  destination = {
    x: 0,
    y: 0,
    panelIndex: 0,
    snapPointIndex: 0,
  };
  color = {
    background: "#0f0",
    border: "#000",
    font: "#fff",
  };
  i: number;
  lineWidth = 8;
  isSelected = false;

  constructor(origin: SnapPointCoordinates, destinationSnapPointIndex: number) {
    this.origin.snapPointIndex = origin.snapPointIndex;
    this.origin.panelIndex = origin.panelIndex;
    this.destination.snapPointIndex = destinationSnapPointIndex;
    this.i = get(signalLines).array.length;
    this.color.background = get(colorState).signalLine.background;
    this.lineWidth =
      get(width) < get(height) ? get(width) / 20 : get(height) / 20;
  }

  setIsSelected(boolean: boolean) {
    this.isSelected = boolean;
    updateSignalLines();
  }

  setEndCoordinates(e) {
    const panel = e.path[1].__data__;
    const indexOfPoint = e.path[0].__data__;
    this.destination.snapPointIndex = indexOfPoint;
    this.destination.panelIndex = panel.i;
  }

  updateColor(color: string) {
    this.color.background = color;
  }

  updateLineWidth(width: number) {
    this.lineWidth = width;
  }
}
