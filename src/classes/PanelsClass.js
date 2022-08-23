import { get, writable } from "svelte/store";
import { SnapPoints, SnapPoint } from "./SnapPointsClass";

import {
  isCtrl,
  width,
  height,
  updatePanels,
  snapPoints as snapPointsStore,
  setMode,
  setSelection,
  signalLines,
  rows,
  columns,
  snapPointsQuantity,
  isShifted,
} from "../store";

export class Panels {
  array = [];
  snapPoints = new SnapPoints();

  constructor() {
    this._store = writable(this);
  }

  updatePanelArray = () => {
    console.log("update panel array");
    let oldPanels = this.array;
    let snapPoints = get(snapPointsStore);

    this.resetArray();
    snapPoints.resetArray();
    this.snapPoints.resetArray();

    let snapPointIndex = 0;
    let count = 0;

    for (let i = 0; i < get(rows); i++) {
      for (let j = 0; j < get(columns); j++) {
        let thisPanelsSnapPointsIndexes = [];
        let snapPointObjects = [];
        let oldPanel = oldPanels[i];

        for (let k = 1; k < get(snapPointsQuantity) + 1; k++) {
          snapPoints.addSnapPoint(i, j, k, count, snapPointIndex);
          this.snapPoints.addSnapPoint(i, j, k, count, snapPointIndex);

          let newSnapPoint = new SnapPoint(i, j, k, count, snapPointIndex);
          snapPointObjects.push(newSnapPoint);

          thisPanelsSnapPointsIndexes.push(snapPointIndex);

          snapPointIndex += 1;
        }

        this.addPanel(
          i,
          j,
          count,
          thisPanelsSnapPointsIndexes,
          oldPanel,
          snapPointObjects
        );

        count++;
      }
    }

    updatePanels();
  };

  subscribe(subscriber) {
    return this._store.subscribe(subscriber);
  }

  addPanel(i, j, count, thisPanelsSnapPoints, oldPanel, snapPointObjects) {
    let newPanel = new Panel(
      i,
      j,
      count,
      thisPanelsSnapPoints,
      oldPanel,
      snapPointObjects
    );
    this.array.push(newPanel);
  }

  pushPanel(panel) {
    this.array.push(panel);
  }

  resetArray() {
    this.array = [];
  }

  deSelect = () => {
    this.array.forEach((p) => p.setIsSelected(false));
    updatePanels();
  };

  hoverPanel = (e) => {
    get(snapPoints).deHover();
    this.deHover();
    let i = e.target.__data__.i;
    this.array[i].setIsHovered(true);
  };

  deHover = () => {
    this.array.forEach((p) => p.setIsHovered(false));
    get(snapPoints).deHover();
    this.snapPoints.deHover();
    updatePanels();
  };

  selectPanels = (arrayOfIndexes) => {
    let snapPointsClass = get(snapPointsStore);
    let signalLinesClass = get(signalLines);
    snapPointsClass.deSelect();
    this.snapPoints.deSelect();
    signalLinesClass.deSelect();

    let arrayOfCurrent = [];

    arrayOfIndexes.forEach((i) => {
      let current = this.array[i].isSelected;
      arrayOfCurrent.push(current);
    });

    if (!get(isCtrl || !get(isShifted))) {
      this.array.forEach((panel) => {
        panel.setIsSelected(false);
      });
    }

    arrayOfIndexes.forEach((panel, i) => {
      let x = arrayOfCurrent[i];
      this.array[panel].setIsSelected(!x);
    });

    setSelection("panels");
    updatePanels();
  };
}

export class Panel {
  i;
  thisPanelsSnapPoints = [];
  colorIndex = 0;
  isSelected = false;
  isHovered = false;
  color = {
    background: "#fff",
    border: "#000",
    font: "#000",
  };
  lineWidth = 0;
  scale = 1;
  x;
  y;
  width;
  height;

  constructor(i, j, count, thisPanelsSnapPoints, oldPanel, snapPointObjects) {
    this.row = i;
    this.column = j;
    this.i = count;
    this.setRatio();
    this.setColorIndex(i, j);
    this.setDimensions();
    this.setLineWidth();
    this.thisPanelsSnapPoints = thisPanelsSnapPoints;
    this.snapPointObjects = snapPointObjects;
    // oldPanel && this.copyFromOldPanel(oldPanel);
    // console.log("constructor");
  }

  setIsHovered(boolean) {
    this.isHovered = boolean;
  }

  // x = {
  //   i: 3,
  //   thisPanelsSnapPoints: [6, 7],
  //   colorIndex: 1,
  //   isSelected: false,
  //   color: {
  //     background: "#fff",
  //     border: "#000",
  //     font: "#000",
  //   },
  //   lineWidth: 2.361025641025641,
  //   scale: 1,
  //   x: 230.2,
  //   y: 159.56666666666666,
  //   width: 76.73333333333333,
  //   height: 153.46666666666667,
  //   row: 0,
  //   column: 3,
  //   panelDimension: 153.46666666666667,
  //   leftPadding: 0,
  //   topPadding: 159.56666666666666,
  //   ratio: 0.5,
  // };

  copyFromOldPanel(oldPanel) {
    this.color = oldPanel.color;
  }

  setColor(key, color) {
    this.color[key] = color;
  }

  setIsSelected(boolean) {
    this.isSelected = boolean;
  }

  toggleIsSelected() {
    // console.log("here");

    this.isSelected = !this.isSelected;
  }

  setLineWidth() {
    this.lineWidth = this.width / 65;
  }

  setRatio() {
    let w = get(width);
    let h = get(height);
    this.ratio = w / h;
  }

  setDimensions() {
    this.width = get(width);
    this.height = get(height);
    this.x = get(width) * this.column + this.leftPadding;
    this.y = get(height) * this.row + this.topPadding;
  }

  setIndex(count) {
    this.i = count;
  }

  setColorIndex(i, j) {
    if ((i + j) % 2 === 1) {
      this.colorIndex = 1;
    }
  }
}
