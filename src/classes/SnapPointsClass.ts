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
  setSelection,
  setSelectedSnapPointIndexes,
  screens,
  currentScreenIndex,
  updateScreens,
} from "../store";

export class SnapPoints implements SnapPointsType {
  array = [];
  selectedSnapPointIndexes = [];
  screenIndex = undefined;

  constructor(screenIndex: number) {
    this.screenIndex = screenIndex;
  }

  setArrayFromLoad(snapPointsArray: LoadSnapPointObj[]) {
    // this.array = [];
    // snapPointsArray.forEach((snapPoint, i) => {
    //   const newSnapPoint = new SnapPoint(
    //     snapPoint.row,
    //     snapPoint.column,
    //     snapPoint.pointIndexWithinPanel,
    //     snapPoint.panelIndex,
    //     snapPoint.pointIndexFullArray
    //   );
    //   this.array.push(newSnapPoint);
    //   this.array[i].setIsTriangle(snapPoint.isTriangle);
    //   this.array[i].setIsSquare(snapPoint.isSquare);
    //   this.array[i].setLabel(snapPoint.label);
    //   this.array[i].setColorObj(snapPoint.color);
    // });
    //
  }

  deSelect = () => {
    this.array.forEach((o) => o.setIsSelected(false));

    updateScreens();
  };

  addSnapPoint(
    i: number,
    j: number,
    k: number,
    count: number,
    snapPointIndex: number
  ) {
    const newSnapPoint = new SnapPoint(
      i,
      j,
      k,
      count,
      snapPointIndex,
      this.screenIndex
    );
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
    const snapPointsClass = get(screens)[get(currentScreenIndex)].snapPoints;
    const signalLinesClass = get(screens)[get(currentScreenIndex)].signalLines;
    snapPointsClass.deSelect();
    signalLinesClass.deSelect();

    if (!get(isCtrl)) {
      this.selectedSnapPointIndexes = [];
      setSelectedSnapPointIndexes([]);
      this.array.forEach((panel) => {
        panel.setIsSelected(false);
      });
    }

    arrayOfIndexes.forEach((i) => {
      this.selectedSnapPointIndexes = arrayOfIndexes;
      this.array[i].setIsSelected(true);
    });

    setSelectedSnapPointIndexes(this.selectedSnapPointIndexes);
  };

  toggleSnapPoints = (arrayOfIndexes: number[]) => {
    const snapPointsClass = get(screens)[get(currentScreenIndex)].snapPoints;
    const signalLinesClass = get(screens)[get(currentScreenIndex)].signalLines;
    snapPointsClass.deSelect();
    signalLinesClass.deSelect();

    if (!get(isCtrl)) {
      this.selectedSnapPointIndexes = [];

      this.array.forEach((panel) => {
        this.selectedSnapPointIndexes = [];
        setSelectedSnapPointIndexes([]);
        panel.setIsSelected(false);
      });
    }

    arrayOfIndexes.forEach((i) => {
      this.selectedSnapPointIndexes = arrayOfIndexes;
      this.array[i].setIsSelected(true);
    });

    setSelectedSnapPointIndexes(this.selectedSnapPointIndexes);
  };

  selectSnapPoint = (e) => {
    const panelsClass = get(screens)[get(currentScreenIndex)].panels;
    const signalLinesClass = get(screens)[get(currentScreenIndex)].signalLines;
    panelsClass.deSelect();
    signalLinesClass.deSelect();

    const i = e.path[0].__data__.pointIndexFullArray;

    const current = this.array[i].isSelected;

    if (!get(isCtrl)) {
      this.selectedSnapPointIndexes = [];

      this.array.forEach((p) => p.setIsSelected(false));
    }

    this.selectedSnapPointIndexes[i];
    setSelectedSnapPointIndexes(this.selectedSnapPointIndexes);

    this.array[i].setIsSelected(!current);
    setSelection("snappoints");

    updateScreens();
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
  };

  setIsTriangles = (boolean: boolean) => {
    this.array.forEach((sp) => {
      if (sp.isSelected) {
        sp.setIsSquare(false);
        sp.setIsTriangle(boolean);
      }
    });
  };

  setColors(key: ColorObjKey, color: string) {
    this.array.forEach((panel) => {
      if (panel.isSelected) {
        panel.setColor(key, color);
      }
    });

    updateScreens();
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
  screenIndex: number;

  constructor(
    row: number,
    column: number,
    pointIndexWithinPanel: number,
    panelIndex: number,
    pointIndexFullArray: number,
    screenIndex: number
  ) {
    this.screenIndex = screenIndex;
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
    const parentPanel =
      get(screens)[get(currentScreenIndex)].panels.array[this.panelIndex];

    const screen = get(screens)[get(currentScreenIndex)];

    let x = screen.width / 2;

    // if (get(snapPointDirection) === "horizontal") {
    if (screen.snapPointDirection === "horizontal") {
      x = (screen.width / 3) * this.pointIndexWithinPanel;
    }

    if (screen.snapPointQuantity === 1) {
      x = screen.width / 2;
    }
    return x + parentPanel.getDimensions().x + this.xOffset;
  }

  getY() {
    const parentPanel =
      get(screens)[get(currentScreenIndex)].panels.array[this.panelIndex];

    const screen = get(screens)[get(currentScreenIndex)];

    let y = (screen.height / 3) * this.pointIndexWithinPanel;

    if (screen.snapPointDirection === "horizontal") {
      y = screen.height / 2;
    }

    if (screen.snapPointQuantity === 1) {
      y = screen.height / 2;
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
    updateScreens();
  }

  setIsTriangle(boolean: boolean) {
    this.isSquare = false;
    this.isTriangle = boolean;
    updateScreens();
  }

  createDimensions(row: number, column: number, pointIndexWithinPanel: number) {
    const screen = get(screens)[this.screenIndex];

    const panelX = screen.width * column;
    const panelY = screen.height * row;

    let x = screen.width / 2;
    let y = (screen.height / 3) * pointIndexWithinPanel;

    if (get(snapPointDirection) === "horizontal") {
      x = (screen.width / 3) * pointIndexWithinPanel;
      y = screen.height / 2;
    }

    if (get(snapPointsQuantity) === 1) {
      x = screen.width / 2;
      y = screen.height / 2;
    }

    this.radius = screen.height / 10;

    if (screen.width < screen.height) {
      this.radius = screen.width / 10;
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
