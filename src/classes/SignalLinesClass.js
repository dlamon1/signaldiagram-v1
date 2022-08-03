import { get, writable } from "svelte/store";
import {
  snapPoints,
  signalLines,
  colorState,
  screenAndPanelDimensions,
  updateSignalLines,
  width,
  height,
  panels,
  isCtrl,
  setSelection,
  setSelectionTab,
  updatePanels,
} from "../store";
import { handleHover, isSnapPointHovered } from "../functions/HandleHover";

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
    //   let example = {
    //     "isSquare": false,
    //     "isCircle": false,
    //     "isTriangle": false,
    //     "label": "A1",
    //     "isSelected": false,
    //     "isHovered": false,
    //     "color": {
    //         "background": "#777",
    //         "font": "#000000",
    //         "border": "#000000"
    //     },
    //     "radius": 8.085714285714285,
    //     "x": 40.42857142857143,
    //     "y": 107.80952380952381,
    //     "row": 0,
    //     "column": 12,
    //     "pointIndexWithinPanel": 2,
    //     "panelIndex": 12,
    //     "pointIndexFullArray": 25,
    //     "strokeWidth": 1.6171428571428572
    // }
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
    // console.log(endIndex);
    let origin = structuredClone(this.origin);
    let sl = new SignalLine(origin, this.destination.snapPointIndex);
    console.log(sl);
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
    console.log(i);
    let snapPointsClass = get(snapPoints);
    let panelsClass = get(panels);

    snapPointsClass.deSelect();
    panelsClass.deSelect();
    updatePanels();

    // this.array[i].selectSignalLine(true);

    // let i = e.target.__data__.i;
    let current = this.array[i].isSelected;

    if (!get(isCtrl)) {
      this.array.forEach((sl) => sl.setIsSelected(false));
      this.array[i].setIsSelected(!current);
    }
    this.array[i].setIsSelected(!current);

    setSelectionTab("signallines");
    setSelection("signallines");

    console.log(this.array);
  }

  deSelect() {
    this.array.forEach((signalLine) => {
      signalLine.isSelected = false;
    });
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
  // lineWidth = get(screenAndPanelDimensions).panelDimension / 10;
  lineWidth = 8;
  isSelected = false;

  constructor(origin, destinationSnapPointIndex) {
    this.origin.snapPointIndex = origin.snapPointIndex;
    this.origin.panelIndex = origin.panelIndex;
    this.destination.snapPointIndex = destinationSnapPointIndex; // this.origin = origin;
    this.i = get(signalLines).array.length;
    this.color.background = get(colorState).signalLine.background;
    this.lineWidth = 5;
  }

  setIsSelected(boolean) {
    console.log("setIsSelected");
    this.isSelected = boolean;
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

    // this.end.x = cooordinatesOfPanel.x + coordinatesOfPoint.x;
    // this.end.y = cooordinatesOfPanel.y + coordinatesOfPoint.y;
    this.destination.snapPointIndex = indexOfPoint;
    this.destination.panelIndex = panel.i;
  }

  updateColor(color) {
    this.backgroundColor = color;
  }

  updateLineWidth(width) {
    this.lineWidth = width;
  }
}
