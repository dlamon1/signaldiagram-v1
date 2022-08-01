import { get } from "svelte/store";

import {
  scale,
  screenAndPanelDimensions,
  width,
  height,
  snapPointDirection,
  snapPointsQuantity,
} from "../store";

export class SnapPoints {
  array = [];

  constructor() {}

  addSnapPoint(i, j, k, count, snapPointIndex) {
    let newSnapPoint = new SnapPoint(i, j, k, count, snapPointIndex);
    this.array.push(newSnapPoint);
  }

  resetArray() {
    this.array = [];
  }
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

    this.radius = panelDimension / 8;

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
}
