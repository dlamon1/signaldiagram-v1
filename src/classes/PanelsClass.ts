import { updateSnapPoints } from "./../store";
import { get } from "svelte/store";

// import { SelectableObjects } from "./SelectableObjectsClass";

import type {
  PanelObj,
  ColorObj,
  LoadPanelObj,
  ColorObjKey,
  PanelsType,
} from "../Types/ClassTypes";

import {
  isCtrl,
  width,
  height,
  updatePanels,
  snapPoints as snapPointsStore,
  setSelection,
  signalLines,
  rows,
  columns,
  snapPointsQuantity,
  isShifted,
} from "../store";

export class Panels implements PanelsType {
  array = [];

  setArrayFromLoad(array: LoadPanelObj[]) {
    this.resetArray();

    array.forEach((panel) => {
      this.addPanel(
        panel.row,
        panel.column,
        panel.i,
        panel.thisPanelsSnapPoints,
        panel.color
      );
    });
    updatePanels();
  }

  deSelect = () => {
    this.array.forEach((o) => o.setIsSelected(false));
    updatePanels();
  };

  updatePanelArray = () => {
    const snapPoints = get(snapPointsStore);

    snapPoints.resetArray();
    this.resetArray();

    let snapPointIndex = 0;
    let count = 0;

    for (let i = 0; i < get(rows); i++) {
      for (let j = 0; j < get(columns); j++) {
        const thisPanelsSnapPointsIndexes = [];

        for (let k = 1; k < get(snapPointsQuantity) + 1; k++) {
          snapPoints.addSnapPoint(i, j, k, count, snapPointIndex);

          thisPanelsSnapPointsIndexes.push(snapPointIndex);

          snapPointIndex += 1;
        }

        this.addPanel(i, j, count, thisPanelsSnapPointsIndexes, null);

        count++;
      }
    }

    updatePanels();
    // updateSnapPoints();
  };

  addPanel(
    i: number,
    j: number,
    count: number,
    thisPanelsSnapPoints: number[],
    colorObj: ColorObj
  ) {
    const newPanel = new Panel(i, j, count, thisPanelsSnapPoints, colorObj);
    this.array.push(newPanel);
  }

  resetArray() {
    this.array = [];
  }

  selectPanels = (arrayOfIndexes: number[]) => {
    const snapPointsClass = get(snapPointsStore);
    const signalLinesClass = get(signalLines);
    snapPointsClass.deSelect();
    signalLinesClass.deSelect();

    const arrayOfCurrent = [];

    arrayOfIndexes.forEach((i) => {
      const current = this.array[i].isSelected;
      arrayOfCurrent.push(current);
    });

    if (!get(isCtrl) || !get(isShifted)) {
      this.array.forEach((panel) => {
        panel.setIsSelected(false);
      });
    }

    arrayOfIndexes.forEach((panel, i) => {
      const x = arrayOfCurrent[i];
      this.array[panel].setIsSelected(!x);
    });

    setSelection("panels");
    updatePanels();
  };
}

export class Panel implements PanelObj {
  row: number;
  column: number;
  i: number;
  thisPanelsSnapPoints = [];
  colorIndex = 0;
  isSelected = false;
  isHovered = false;
  color: ColorObj = {
    background: "#fff",
    border: "#000",
    font: "#000",
  };
  lineWidth = 0;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(
    i: number,
    j: number,
    count: number,
    thisPanelsSnapPoints: number[],
    colorObj: ColorObj
  ) {
    this.row = i;
    this.column = j;
    this.i = count;
    this.setColorIndex(i, j);
    this.setDimensions();
    this.setLineWidth();
    this.thisPanelsSnapPoints = thisPanelsSnapPoints;
    this.setColorObj(colorObj);
  }

  setColorObj(colorObj: ColorObj) {
    if (colorObj) {
      this.color = colorObj;
    }
  }

  setIsHovered(boolean: boolean) {
    this.isHovered = boolean;
  }

  setColor(key: ColorObjKey, color: string) {
    this.color[key] = color;
  }

  setIsSelected(boolean: boolean) {
    this.isSelected = boolean;
  }

  toggleIsSelected() {
    this.isSelected = !this.isSelected;
  }

  setLineWidth() {
    this.lineWidth = this.width / 65;
  }

  setDimensions() {
    this.width = get(width);
    this.height = get(height);
    this.x = get(width) * this.column;
    this.y = get(height) * this.row;
  }

  setIndex(count: number) {
    this.i = count;
  }

  setColorIndex(i: number, j: number) {
    if ((i + j) % 2 === 1) {
      this.colorIndex = 1;
    }
  }
}
