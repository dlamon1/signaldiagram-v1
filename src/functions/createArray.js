import { get } from "svelte/store";
import { screenAndPanelDimensions } from "../store";

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

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
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
      });

      count++;
    }
  }

  return array;
};
