import { get } from "svelte/store";

import type {
  PanelObj,
  ColorObj,
  LoadPanelObj,
  ColorObjKey,
  PanelsType,
} from "../Types/ClassTypes";

import {
  isCtrl,
  setSelection,
  snapPointsQuantity,
  screens,
  updateScreens,
  currentScreenIndex,
} from "../store";

export class Panels implements PanelsType {
  screenIndex: number = undefined;
  array = [];
  selectedIndexes: number[] = [];

  constructor(screenIndex: number) {
    this.screenIndex = screenIndex;
  }

  load(panels: any) {
    panels.array.forEach((p, i) => {
      this.addPanel(
        p.row,
        p.column,
        p.i,
        p.thisPanelsSnapPoints,
        null,
        p.reverseIndex
      );
      this.array[i].setColor("background", p.color.background);
      this.array[i].setColor("font", p.color.text);
      this.array[i].setColor("border", p.color.border);
      this.array[i].reverseIndex = p.reverseIndex;
      this.array[i].lineWidthMultiplier = p.lineWidthMultiplier;
    });
  }

  deSelect = () => {
    this.array.forEach((o) => o.setIsSelected(false));
    updateScreens();
  };

  initArray = (rows: number, columns: number) => {
    const snapPoints = get(screens)[this.screenIndex].snapPoints;

    let snapPointIndex = 0;

    let count = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const reverseIndex = columns - j + i * columns;

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
  };

  updatePanelArray = () => {};

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
      reverseIndex,
      this.screenIndex
    );

    this.array.push(newPanel);
  }

  resetArray() {
    this.array = [];
  }

  selectPanels = (arrayOfIndexes: number[]) => {
    const snapPointsClass = get(screens)[get(currentScreenIndex)].snapPoints;
    const signalLinesClass = get(screens)[get(currentScreenIndex)].signalLines;
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
  };

  togglePanels = (arrayOfIndexes: number[]) => {
    let screen = get(screens)[this.screenIndex];
    const snapPointsClass = screen.snapPoints;
    const signalLinesClass = screen.signalLines;

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
    updateScreens();
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
  screenIndex: number;

  constructor(
    i: number,
    j: number,
    count: number,
    thisPanelsSnapPoints: number[],
    colorObj: ColorObj,
    reverseIndex: number,
    screenIndex: number
  ) {
    this.screenIndex = screenIndex;
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
    let screen = get(screens)[this.screenIndex];

    this.width = screen.width;
    this.height = screen.height;
    this.x = this.width * this.column;
    if (screen.isRearView) {
      this.x = screen.width * (screen.columns - this.column + 1);
    }
    this.y = this.height * this.row;
  }

  getDimensions() {
    let screen = get(screens)[this.screenIndex];

    let x = screen.width * this.column;

    if (screen.isRearView) {
      x = screen.width * (screen.columns - this.column - 1);
    }

    let y = screen.height * this.row;

    return { x, y };
  }

  getCoordinateText() {
    let screen = get(screens)[this.screenIndex];

    if (!screen.showCoordinates) {
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
