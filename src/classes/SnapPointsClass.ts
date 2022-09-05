import { get } from "svelte/store";
import type {
  ColorObj,
  LoadSnapPointObj,
  SnapPointObj,
  SnapPointsType,
  ColorObjKey,
} from "../Types/ClassTypes";

import {
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

export class SnapPoints implements SnapPointsType {
  array = [];
  selectedSnapPointIndexes = [];

  setArrayFromLoad(snapPointsArray: LoadSnapPointObj[]) {
    this.array = [];
    snapPointsArray.forEach((snapPoint, i) => {
      const newSnapPoint = new SnapPoint(
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

  deSelect = () => {
    this.array.forEach((o) => o.setIsSelected(false));
    updatePanels();
  };

  addSnapPoint(
    i: number,
    j: number,
    k: number,
    count: number,
    snapPointIndex: number
  ) {
    const newSnapPoint = new SnapPoint(i, j, k, count, snapPointIndex);
    this.array.push(newSnapPoint);
  }

  resetArray() {
    this.array = [];
  }

  getXCoordinate(snapPoint: SnapPointObj) {
    return snapPoint.getX();
  }

  getYCoordinate(snapPoint: SnapPointObj) {
    return snapPoint.getY();
  }

  selectSnapPoints = (arrayOfIndexes: number[]) => {
    const snapPointsClass = get(snapPoints);
    const signalLinesClass = get(signalLines);
    snapPointsClass.deSelect();
    signalLinesClass.deSelect();
    updateSnapPoints();
    updateSignalLines();

    if (!get(isCtrl)) {
      this.selectedSnapPointIndexes = [];
      this.array.forEach((panel) => {
        panel.setIsSelected(false);
      });
    }

    arrayOfIndexes.forEach((i) => {
      this.selectedSnapPointIndexes = arrayOfIndexes;
      this.array[i].setIsSelected(true);
    });

    updateSnapPoints();
  };

  toggleSnapPoints = (arrayOfIndexes: number[]) => {
    const snapPointsClass = get(snapPoints);
    const signalLinesClass = get(signalLines);
    snapPointsClass.deSelect();
    signalLinesClass.deSelect();
    updateSnapPoints();
    updateSignalLines();

    if (!get(isCtrl)) {
      this.selectedSnapPointIndexes = [];

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
    const panelsClass = get(panels);
    const signalLinesClass = get(signalLines);
    panelsClass.deSelect();
    signalLinesClass.deSelect();

    const i = e.path[0].__data__.pointIndexFullArray;

    const current = this.array[i].isSelected;

    if (!get(isCtrl)) {
      this.selectedSnapPointIndexes = [];

      this.array.forEach((p) => p.setIsSelected(false));
    }

    this.selectedSnapPointIndexes[i];
    this.array[i].setIsSelected(!current);
    setSelection("snappoints");

    updateSnapPoints();
    updatePanels();
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

  setIsSquares = (boolean: boolean) => {
    this.array.forEach((sp) => {
      if (sp.isSelected) {
        sp.setIsTriangle(false);
        sp.setIsSquare(boolean);
      }
    });
    updateSnapPoints();
  };

  setIsTriangles = (boolean: boolean) => {
    this.array.forEach((sp) => {
      if (sp.isSelected) {
        sp.setIsSquare(false);
        sp.setIsTriangle(boolean);
      }
    });
    updateSnapPoints();
  };

  setColors(key: ColorObjKey, color: string) {
    this.array.forEach((panel) => {
      if (panel.isSelected) {
        panel.setColor(key, color);
      }
    });
    updatePanels();
  }

  setXOffsets(value: number) {
    this.array.forEach((panel) => {
      if (panel.isSelected) {
        panel.setXOffset(value);
      }
    });
  }

  setYOffsets(value: number) {
    this.array.forEach((panel) => {
      if (panel.isSelected) {
        panel.setYOffset(value);
      }
    });
  }
}

export class SnapPoint implements SnapPointObj {
  isSquare = false;
  isCircle = false;
  isTriangle = false;
  label = "A1";
  isSelected = false;
  isHovered = false;
  color = {
    background: "#777777",
    font: "#ffffff",
    border: "#000000",
  };
  translateString: string;
  radius: number;
  x: number;
  y: number;
  row: number;
  column: number;
  pointIndexWithinPanel: number;
  panelIndex: number;
  pointIndexFullArray: number;
  strokeWidth: number;
  isHidden: boolean;
  xOffset = 0;
  yOffset = 0;

  constructor(
    row: number,
    column: number,
    pointIndexWithinPanel: number,
    panelIndex: number,
    pointIndexFullArray: number
  ) {
    this.row = row;
    this.column = column;
    this.pointIndexWithinPanel = pointIndexWithinPanel;
    this.panelIndex = panelIndex;
    this.pointIndexFullArray = pointIndexFullArray;
    this.createDimensions(row, column, pointIndexWithinPanel);
  }

  setIsHidden(isHidden: boolean) {
    this.isHidden = isHidden;
  }

  getX() {
    const parentPanel = get(panels).array[this.panelIndex];

    let x = get(width) / 2;

    if (get(snapPointDirection) === "horizontal") {
      x = (get(width) / 3) * this.pointIndexWithinPanel;
    }

    if (get(snapPointsQuantity) === 1) {
      x = get(width) / 2;
    }
    return x + parentPanel.getDimensions().x + this.xOffset;
  }

  getY() {
    const parentPanel = get(panels).array[this.panelIndex];
    let y = (get(height) / 3) * this.pointIndexWithinPanel;

    if (get(snapPointDirection) === "horizontal") {
      y = get(height) / 2;
    }

    if (get(snapPointsQuantity) === 1) {
      y = get(height) / 2;
    }
    return y + parentPanel.getDimensions().y + this.yOffset;
  }

  setXOffset(value: number) {
    this.xOffset = value;
  }

  setYOffset(value: number) {
    this.yOffset = value;
  }

  getTranslateString() {
    const x = this.getX();
    const y = this.getY();

    this.translateString = `translate(${x}, ${y})`;

    return this.translateString;
  }

  removeLabel = () => {
    this.label = "";
  };

  setLabel(label: string) {
    this.label = label;
  }

  setColor(key: ColorObjKey, color: string) {
    this.color[key] = color;
  }

  setColorObj(colorObj: ColorObj) {
    this.color = colorObj;
  }

  setBackgroundColor(color: string) {
    this.color.background = color;
  }

  setBorderColor(color: string) {
    this.color.border = color;
  }

  setFontColor(color: string) {
    this.color.font = color;
  }

  setIsSquare(boolean: boolean) {
    this.isTriangle = false;
    this.isSquare = boolean;
  }

  setIsTriangle(boolean: boolean) {
    this.isSquare = false;
    this.isTriangle = boolean;
  }

  createDimensions(row: number, column: number, pointIndexWithinPanel: number) {
    const panelX = get(width) * column;
    const panelY = get(height) * row;

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

  setIsSelected(boolean: boolean) {
    this.isSelected = boolean;
  }

  setIsHovered(boolean: boolean) {
    this.isHovered = boolean;
  }

  getLabelString() {
    if (this.isHidden) return "";
    return this.label;
  }
}
