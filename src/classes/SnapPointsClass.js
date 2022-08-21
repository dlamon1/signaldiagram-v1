import { get } from "svelte/store";
import { writable } from "svelte/store";

import {
  scale,
  screenAndPanelDimensions,
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
  height
} from "../store";

export class SnapPoints {
  array = [];

  constructor() {
    this._store = writable(this);
    // this.s = get(screenAndPanelDimensions);
    this.ratio = get(width) / get(height);
  }

  addSnapPoint(i, j, k, count, snapPointIndex) {
    let newSnapPoint = new SnapPoint(i, j, k, count, snapPointIndex);
    this.array.push(newSnapPoint);
  }

  resetArray() {
    this.array = [];
  }

  // let snpObj = {
  //   isSquare: false,
  //   isCircle: false,
  //   isTriangle: false,
  //   label: "A1",
  //   isSelected: false,
  //   color: {
  //     background: "#777",
  //     font: "#000000",
  //     border: "#000000",
  //   },
  //   radius: 8.085714285714285,
  //   x: 40.42857142857143,
  //   y: 53.904761904761905,
  //   row: 3,
  //   column: 7,
  //   pointIndexWithinPanel: 1,
  //   panelIndex: 49,
  //   pointIndexFullArray: 98,
  //   strokeWidth: 1.6171428571428572,
  // };

  getXCoordinate(snapPoint) {
    return (
      get(width) * snapPoint.column  + snapPoint.x
    );
  }

  getYCoordinate(snapPoint) {
    return get(height) * snapPoint.row + snapPoint.y;
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

  removeLabel = () => {
    this.label = "";
    console.log("remove label");
  };

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

  setPanelDimension() {
    let p = get(screenAndPanelDimensions);
    this.panelDimension = p.panelDimension;
    this.leftPadding = p.leftPadding;
    this.topPadding = p.topPadding;
  }

  createDimensions(row, column, pointIndexWithinPanel) {
    // let panelDimension = get(screenAndPanelDimensions).panelDimension;
    // let ratio = get(width) / get(height);

    let x = (get(width) / 2) ;
    let y = (get(height) / 3) * pointIndexWithinPanel;

    if (get(snapPointDirection) === "horizontal") {
      x = ((get(width)) / 3) * pointIndexWithinPanel;
      y = get(height) / 2;
    }

    if (get(snapPointsQuantity) === 1) {
      x = (get(width)) / 2;
      y = get(height) / 2;
    }

    this.radius = get(height) / 10;

    if (get(width) < get(height)) {
      this.radius = get(width)/ 10;
    }

    this.x = x;
    this.y = y;
    this.strokeWidth = this.radius / 10;
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
