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
  showCoordinates,
  isRearView,
} from "../store";

export class Panels implements PanelsType {
  array = [];
  selectedIndexes: number[] = [];

  setArrayFromLoad(array: LoadPanelObj[]) {
    this.resetArray();

    array.forEach((panel) => {
      this.addPanel(
        panel.row,
        panel.column,
        panel.i,
        panel.thisPanelsSnapPoints,
        panel.color,
        panel.reverseIndex
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
        const reverseIndex = get(columns) - j + i * get(columns);

        const thisPanelsSnapPointsIndexes = [];

        for (let k = 1; k < get(snapPointsQuantity) + 1; k++) {
          snapPoints.addSnapPoint(i, j, k, count, snapPointIndex);

          thisPanelsSnapPointsIndexes.push(snapPointIndex);

          snapPointIndex += 1;
        }

        this.addPanel(
          i,
          j,
          count,
          thisPanelsSnapPointsIndexes,
          null,
          reverseIndex
        );

        count++;
      }
    }

    updatePanels();
  };

  addPanel(
    i: number,
    j: number,
    count: number,
    thisPanelsSnapPoints: number[],
    colorObj: ColorObj,
    reverseIndex: number
  ) {
    const newPanel = new Panel(
      i,
      j,
      count,
      thisPanelsSnapPoints,
      colorObj,
      reverseIndex
    );
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
    this.selectedIndexes = [];

    arrayOfIndexes.forEach((i) => {
      const current = this.array[i].isSelected;
      arrayOfCurrent.push(current);
      this.selectedIndexes.push(i);
    });

    if (!get(isCtrl)) {
      this.selectedIndexes = [];

      this.array.forEach((panel) => {
        panel.setIsSelected(false);
      });
    }

    arrayOfIndexes.forEach((panel, i) => {
      const x = arrayOfCurrent[i];
      this.array[panel].setIsSelected(true);
      this.selectedIndexes.push(i);
    });

    setSelection("panels");
    updatePanels();
  };

  togglePanels = (arrayOfIndexes: number[]) => {
    const snapPointsClass = get(snapPointsStore);
    const signalLinesClass = get(signalLines);
    snapPointsClass.deSelect();
    signalLinesClass.deSelect();

    const arrayOfCurrent = [];
    this.selectedIndexes = [];

    arrayOfIndexes.forEach((i) => {
      const current = this.array[i].isSelected;
      arrayOfCurrent.push(current);
      this.selectedIndexes.push(i);
    });

    if (!get(isCtrl)) {
      this.selectedIndexes = [];

      this.array.forEach((panel) => {
        panel.setIsSelected(false);
      });
    }

    arrayOfIndexes.forEach((panel, i) => {
      const x = arrayOfCurrent[i];
      this.array[panel].setIsSelected(!x);
      this.selectedIndexes.push(i);
    });

    setSelection("panels");
    updatePanels();
  };

  toggleHidePanels() {
    console.log(this.selectedIndexes);
  }

  setColors(key: ColorObjKey, color: string) {
    this.array.forEach((panel) => {
      if (panel.isSelected) {
        panel.setColor(key, color);
      }
    });
    updatePanels();
  }
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
    background: "#ffffff",
    border: "#000000",
    font: "#000000",
  };
  lineWidth = 1;
  lineWidthMultiplier = 1;
  x: number;
  y: number;
  width: number;
  height: number;
  reverseIndex: number;
  isHidden: boolean;

  constructor(
    i: number,
    j: number,
    count: number,
    thisPanelsSnapPoints: number[],
    colorObj: ColorObj,
    reverseIndex: number
  ) {
    this.row = i;
    this.column = j;
    this.i = count;
    this.setColorIndex(i, j);
    this.setDimensions();
    this.setLineWidth();
    this.thisPanelsSnapPoints = thisPanelsSnapPoints;
    this.setColorObj(colorObj);
    this.reverseIndex = reverseIndex;
  }

  setIsHidden(isHidden: boolean) {
    this.isHidden = isHidden;
  }

  setLineWidthMultiplier(multiplier: number) {
    this.lineWidthMultiplier = multiplier;
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
    if (get(isRearView)) {
      this.x = get(width) * (get(columns) - this.column + 1);
    }
    this.y = get(height) * this.row;
  }

  getDimensions() {
    let x = get(width) * this.column;

    if (get(isRearView)) {
      x = get(width) * (get(columns) - this.column - 1);
    }

    let y = get(height) * this.row;

    return { x, y };
  }

  getCoordinateText() {
    if (!get(showCoordinates)) {
      return "";
    }

    if (this.isHidden) return "";

    return this.column + 1 + "," + (this.row + 1);
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
