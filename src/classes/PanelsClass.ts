import { get, writable } from "svelte/store";
import { SnapPoints, SnapPoint } from "./SnapPointsClass";

import { SelectableObjects } from "./SelectableObjectsClass";

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

interface ColorObj {
  background: string;
  border: string;
  font: string;
}

type ColorObjKey = "background" | "border" | "font";

interface LoadPanelObj {
  row: number;
  column: number;
  i: number;
  thisPanelsSnapPoints: number[];
  color: ColorObj;
}

interface PanelsClass {
  arrary: PanelObj[]
}

export class Panels {
  array = [];

  constructor() {
    // super();
  }

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
    let oldPanels = this.array;
    let snapPoints = get(snapPointsStore);

    this.resetArray();

    let snapPointIndex = 0;
    let count = 0;

    for (let i = 0; i < get(rows); i++) {
      for (let j = 0; j < get(columns); j++) {
        let thisPanelsSnapPointsIndexes = [];
        let snapPointObjects = [];
        let oldPanel = oldPanels[i];

        for (let k = 1; k < get(snapPointsQuantity) + 1; k++) {
          snapPoints.addSnapPoint(i, j, k, count, snapPointIndex);

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
          null
        );

        count++;
      }
    }

    updatePanels();
  };

  addPanel(i: number, j: number, count: number, thisPanelsSnapPoints: number[], colorObj: ColorObj) {
    let newPanel = new Panel(
      i,
      j,
      count,
      thisPanelsSnapPoints,
      colorObj
    );
    this.array.push(newPanel);
  }

  pushPanel(panel) {
    this.array.push(panel);
  }

  resetArray() {
    this.array = [];
  }

  hoverPanel = (e) => {
    let snapPoints = get(snapPointsStore);

    get(snapPoints).deHover();
    this.deHover();
    let i = e.target.__data__.i;
    this.array[i].setIsHovered(true);
  };

  deHover = () => {
    let snapPoints = get(snapPointsStore);

    this.array.forEach((p) => p.setIsHovered(false));
    get(snapPoints).deHover();
    updatePanels();
  };

  selectPanels = (arrayOfIndexes) => {
    let snapPointsClass = get(snapPointsStore);
    let signalLinesClass = get(signalLines);
    snapPointsClass.deSelect();
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

interface PanelObj {
  i: number;
  row: number;
  column: number;
  thisPanelsSnapPoints: number[];
  color: ColorObj;
  isSelected: boolean;
  isHovered: boolean;
  lineWidth: number;
  x: number;
  y: number;
  width: number;
  height: number;
  setColor: (key: ColorObjKey, color: string) => void;
  setIsSelected: (isSelected: boolean) => void;
  setIsHovered: (isHovered: boolean) => void;
  setLineWidth: (lineWidth: number) => void;
  toggleIsSelected: () => void;
  setDimensions: () => void;
  setIndex: (i: number) => void;
  setColorIndex: (i: number, j: number) => void;
}


export class Panel implements PanelObj {
  row: number;
  column: number
  i: number;
  thisPanelsSnapPoints = [];
  colorIndex: number = 0;
  isSelected: boolean = false;
  isHovered: boolean = false;
  color: ColorObj = {
    background: "#fff",
    border: "#000",
    font: "#000",
  };
  lineWidth: number = 0;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(i: number, j: number, count: number, thisPanelsSnapPoints: number[], colorObj:ColorObj ) {
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
