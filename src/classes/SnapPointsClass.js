import { get } from "svelte/store";
import { writable } from "svelte/store";

import {
  scale,
  screenAndPanelDimensions,
  width,
  height,
  snapPointDirection,
  snapPointsQuantity,
  isCtrl,
  updateSnapPoints,
  panels,
  setSelectionTab,
  setSelection,
} from "../store";

export class SnapPoints {
  array = [];

  constructor() {
    this._store = writable(this);
  }

  addSnapPoint(i, j, k, count, snapPointIndex) {
    let newSnapPoint = new SnapPoint(i, j, k, count, snapPointIndex);
    this.array.push(newSnapPoint);
  }

  resetArray() {
    this.array = [];
  }

  selectSnapPoint = (e) => {
    let panelsClass = get(panels);
    panelsClass.deSelectedPanels();

    let i = e.path[0].__data__;

    if (!get(isCtrl)) {
      this.array.forEach((p) => p.setIsSelected(false));
    }

    this.array[i].toggleIsSelected();
    setSelectionTab("snapPoints");
    setSelection("snapPoints");
    updateSnapPoints();
  };

  deSelectSnapPoints = () => {
    this.array.forEach((p) => p.setIsSelected(false));
  };
}

class SnapPoint {
  isSquare = false;
  isCircle = false;
  isTriangle = false;
  label = "A1";
  isSelected = false;
  color = {
    background: "#777",
    font: "#000000",
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

  setPanelDimension() {
    let p = get(screenAndPanelDimensions);
    this.panelDimension = p.panelDimension;
    this.leftPadding = p.leftPadding;
    this.topPadding = p.topPadding;
  }

  createDimensions(row, column, pointIndexWithinPanel) {
    let panelDimension = get(screenAndPanelDimensions).panelDimension;
    let ratio = get(width) / get(height);

    let x = (panelDimension / 2) * ratio;
    let y = (panelDimension / 3) * pointIndexWithinPanel;

    if (get(snapPointDirection) === "horizontal") {
      x = ((panelDimension * ratio) / 3) * pointIndexWithinPanel;
      y = panelDimension / 2;
    }

    if (get(snapPointsQuantity) === 1) {
      x = (panelDimension * ratio) / 2;
      y = panelDimension / 2;
    }

    this.radius = panelDimension / 10;

    if (panelDimension * ratio < panelDimension) {
      this.radius = this.radius * ratio;
    }

    this.x = x;
    this.y = y;
    this.strokeWidth = panelDimension / 100;
  }

  toggleIsSelected() {
    console.log("toggling snap point");
    this.isSelected = !this.isSelected;
  }

  setIsSelected(boolean) {
    this.isSelected = boolean;
  }
}
