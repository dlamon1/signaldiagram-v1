import { get } from "svelte/store";
import {
  screenAndPanelDimensions,
  snapPointsQuantity,
  width,
  height,
  snapPointDirection,
  setSnapPoints,
} from "../store";

export const createArray = (
  // dimensions,
  rows,
  columns,
  canvasWidth,
  canvasHeight,
  colors,
  ratio,
  toolbarWidth,
  panels,
  scale
) => {
  let array = [];

  let panelDimension = get(screenAndPanelDimensions).panelDimension;
  let topPadding = get(screenAndPanelDimensions).topPadding;
  let leftPadding = get(screenAndPanelDimensions).leftPadding;
  // console.log("creating array, " + panelDimension);

  let count = 0;
  let snapPointIndex = 0;

  let allSnapPoints = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let thisPanelsSnapPoints = [];

      for (let k = 1; k < get(snapPointsQuantity) + 1; k++) {
        let newPoint = new SnapPoint(i, j, k, count, snapPointIndex);
        thisPanelsSnapPoints.push(newPoint);
        allSnapPoints.push(newPoint);
        snapPointIndex += 1;
      }

      let colorIndex = 0;
      let backgroundColor = colorIndex == 0 ? colors.one : colors.two;

      if ((i + j) % 2 === 1) {
        colorIndex = 1;
      }

      if (panels[count]) {
        backgroundColor = panels[count].backgroundColor;
      }

      scale = 1;
      // let panelDimension = canvasWidth / columns / ratio;

      array.push({
        i: count,
        row: i,
        column: j,
        colorIndex: colorIndex,
        isSelected: false,
        width: panelDimension * ratio * scale,
        height: panelDimension * scale,
        x: panelDimension * j * ratio * scale + leftPadding,
        y: panelDimension * i * scale + topPadding,
        color: colorIndex == 0 ? colors.one : colors.two,
        lineWidth: 1,
        backgroundColor: backgroundColor,
        borderColor: "#000000",
        showCoordinates: true,
        isRearView: false,
        thisPanelsSnapPoints,
      });

      count++;
    }
  }

  // console.log(allSnapPoints);
  // setSnapPoints(allSnapPoints);
  return array;
};

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
