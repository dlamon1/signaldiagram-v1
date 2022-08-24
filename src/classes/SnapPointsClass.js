import { get } from "svelte/store";
import { writable } from "svelte/store";

import {
  scale,
  snapPointDirection,
  snapPointsQuantity,
  isCtrl,
  updateSnapPoints,
  panels,
  setSelection,
  signalLines,
  snapPoints,
  updateSignalLines,
  updatePanels,
  width,
  height,
} from "../store";

export class SnapPoints {
  array = [];

  constructor() {
    this._store = writable(this);
    this.ratio = get(width) / get(height);
  }

  setArrayFromLoad(snapPointsArray) {
    this.array = [];
    snapPointsArray.forEach((snapPoint, i) => {
      let newSnapPoint = new SnapPoint(
        snapPoint.row,
        snapPoint.column,
        snapPoint.pointIndexWithinPanel,
        snapPoint.panelIndex,
        snapPoint.pointIndexFullArray
      );

      this.array.push(newSnapPoint);
      this.array[i].setIsTriangle(snapPoint.isTriangle);
      this.array[i].setIsSquare(snapPoint.isSquare);
      this.array[i].setLabel(snapPoint.label);
      this.array[i].setColorObj(snapPoint.color);
    });
    updateSnapPoints();
  }

  obj = {
    isSquare: false,
    isCircle: false,
    isTriangle: false,
    label: "A1",
    isSelected: false,
    isHovered: false,
    color: {
      background: "#777",
      font: "#FFF",
      border: "#000000",
    },
    radius: 16,
    x: 80,
    y: 213.33333333333334,
    row: 4,
    column: 7,
    pointIndexWithinPanel: 2,
    panelIndex: 59,
    pointIndexFullArray: 119,
    strokeWidth: 1.6,
  };

  addSnapPoint(i, j, k, count, snapPointIndex) {
    let newSnapPoint = new SnapPoint(i, j, k, count, snapPointIndex);
    this.array.push(newSnapPoint);
  }

  resetArray() {
    this.array = [];
  }

  getXCoordinate(snapPoint) {
    return snapPoint.getX();
  }

  getYCoordinate(snapPoint) {
    return snapPoint.getY();
  }

  hoverSnapPoint(e) {
    this.deHover();
    get(panels).deHover();
    // console.log("hover");
    let i = e.path[0].__data__.pointIndexFullArray;
    this.array[i].setIsHovered(true);

    updateSnapPoints();
  }

  deHover() {
    this.array.forEach((sp) => {
      sp.setIsHovered(false);
    });
    updateSnapPoints();
  }

  selectSnapPoints = (arrayOfIndexes) => {
    let snapPointsClass = get(snapPoints);
    let signalLinesClass = get(signalLines);
    snapPointsClass.deSelect();
    signalLinesClass.deSelect();
    updateSnapPoints();
    updateSignalLines();

    if (!get(isCtrl)) {
      this.array.forEach((panel) => {
        panel.setIsSelected(false);
      });
    }

    arrayOfIndexes.forEach((i) => {
      this.array[i].setIsSelected(true);
    });

    updateSnapPoints();
  };

  selectSnapPoint = (e) => {
    let panelsClass = get(panels);
    let signalLinesClass = get(signalLines);
    panelsClass.deSelect();
    signalLinesClass.deSelect();

    let i = e.path[0].__data__.pointIndexFullArray;

    let current = this.array[i].isSelected;

    if (!get(isCtrl)) {
      this.array.forEach((p) => p.setIsSelected(false));
    }

    this.array[i].setIsSelected(!current);
    setSelection("snappoints");

    updateSnapPoints();
    updatePanels();
  };

  deSelect = () => {
    this.array.forEach((p) => p.setIsSelected(false));
    updateSnapPoints();
  };

  removeLabel = () => {
    this.array.forEach((sp) => {
      if (sp.isSelected) {
        sp.removeLabel();
      }
    });
    this.setIsSquares(false);
    this.setIsTriangles(false);
  };

  setIsSquares = (boolean) => {
    this.array.forEach((sp) => {
      if (sp.isSelected) {
        sp.setIsTriangle(false);
        sp.setIsSquare(boolean);
      }
    });
    updateSnapPoints();
  };

  setIsTriangles = (boolean) => {
    this.array.forEach((sp) => {
      if (sp.isSelected) {
        sp.setIsSquare(false);
        sp.setIsTriangle(boolean);
      }
    });
    updateSnapPoints();
  };
}

export class SnapPoint {
  isSquare = false;
  isCircle = false;
  isTriangle = false;
  label = "A1";
  isSelected = false;
  isHovered = false;
  color = {
    background: "#777",
    font: "#FFF",
    border: "#000000",
  };
  translateString;
  radius;
  x;
  y;
  row;
  column;

  constructor(
    row,
    column,
    pointIndexWithinPanel,
    panelIndex,
    pointIndexFullArray
  ) {
    this.row = row;
    this.column = column;
    this.pointIndexWithinPanel = pointIndexWithinPanel;
    this.panelIndex = panelIndex;
    this.pointIndexFullArray = pointIndexFullArray;
    this.createDimensions(row, column, pointIndexWithinPanel);
  }

  getX() {
    let parentPanel = get(panels).array[this.panelIndex];

    let x = get(width) / 2;

    if (get(snapPointDirection) === "horizontal") {
      x = (get(width) / 3) * this.pointIndexWithinPanel;
    }

    if (get(snapPointsQuantity) === 1) {
      x = get(width) / 2;
    }
    return x + parentPanel.x;
  }

  getY() {
    let parentPanel = get(panels).array[this.panelIndex];
    let y = (get(height) / 3) * this.pointIndexWithinPanel;

    if (get(snapPointDirection) === "horizontal") {
      y = get(height) / 2;
    }

    if (get(snapPointsQuantity) === 1) {
      y = get(height) / 2;
    }
    return y + parentPanel.y;
  }

  getTranslateString() {
    let x = this.getX();
    let y = this.getY();

    this.translateString = `translate(${x}, ${y})`;

    return this.translateString;
  }

  removeLabel = () => {
    this.label = "";
  };

  setLabel(label) {
    this.label = label;
  }

  setColorObj(colorObj) {
    this.color = colorObj;
  }

  setBackgroundColor(color) {
    this.color.background = color;
  }

  setBorderColor(color) {
    this.color.border = color;
  }

  setFontColor(color) {
    this.color.font = color;
  }

  setIsSquare(boolean) {
    this.isTriangle = false;
    this.isSquare = boolean;
  }

  setIsTriangle(boolean) {
    this.isSquare = false;
    this.isTriangle = boolean;
  }

  createDimensions(row, column, pointIndexWithinPanel) {
    let panelX = get(width) * column;
    let panelY = get(height) * row;

    let x = get(width) / 2;
    let y = (get(height) / 3) * pointIndexWithinPanel;

    if (get(snapPointDirection) === "horizontal") {
      x = (get(width) / 3) * pointIndexWithinPanel;
      y = get(height) / 2;
    }

    if (get(snapPointsQuantity) === 1) {
      x = get(width) / 2;
      y = get(height) / 2;
    }

    this.radius = get(height) / 10;

    if (get(width) < get(height)) {
      this.radius = get(width) / 10;
    }

    this.x = x + panelX;
    this.y = y + panelY;
    this.strokeWidth = this.radius / 2;
    this.translateString = `translate(${this.x}, ${this.y})`;
  }

  toggleIsSelected() {
    this.isSelected = !this.isSelected;
  }

  setIsSelected(boolean) {
    this.isSelected = boolean;
  }

  setIsHovered(boolean) {
    this.isHovered = boolean;
  }

  subscribe(subscriber) {
    return this._store.subscribe(subscriber);
  }
}
