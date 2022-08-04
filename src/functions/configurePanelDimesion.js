import { get } from "svelte/store";

import {
  initCanvasWidth,
  initCanvasHeight,
  rows,
  columns,
  width,
  height,
  innerWidth,
  innerHeight,
  toolbarWidth,
  canvasHeight,
  canvasWrapperWidth,
  canvasWrapperHeight,
} from "../store";

export const configurePanelDimensionsForScreen = () => {
  // console.log("here");
  let panelDimension;
  let leftPadding;
  let topPadding;
  let _canvasWrapperWidth = get(canvasWrapperWidth);
  let _canvasWrapperHeight = get(canvasWrapperHeight);
  let newCanvasHeight, newCanvasWidth;

  let _rows = get(rows);
  let _columns = get(columns);
  let _width = get(width);
  let _height = get(height);

  let ratio = _width / _height;

  if (_canvasWrapperWidth / _columns / ratio > _canvasWrapperHeight / _rows) {
    // console.log("if is constraining");
    panelDimension = _canvasWrapperHeight / _rows;

    newCanvasWidth = panelDimension * _columns * ratio;
    newCanvasHeight = _canvasWrapperHeight;
    leftPadding = (_canvasWrapperWidth - newCanvasWidth) / 2;
    topPadding = 0;
  } else {
    panelDimension = _canvasWrapperWidth / _columns / ratio;

    newCanvasWidth = _canvasWrapperWidth;
    newCanvasHeight = panelDimension * _rows;
    topPadding = (_canvasWrapperHeight - newCanvasHeight) / 2;
    leftPadding = 0;
  }

  return {
    panelDimension,
    leftPadding: 0,
    topPadding: 0,
    newCanvasWidth,
    newCanvasHeight,
  };
};

export const configurePanelDimensionsForPrinting = (title) => {
  let panelDimension;
  let leftPadding;
  let topPadding;
  let newCanvasWidth;
  let newCanvasHeight;

  let _initCanvasWidth = 2200;
  let _initCanvasHeight = 1700;
  let _rows = get(rows);
  let _columns = get(columns);
  let _width = get(width);
  let _height = get(height);

  let ratio = _width / _height;

  if (
    (_initCanvasWidth - 100) / _columns / ratio >
    (_initCanvasHeight - 100) / _rows
  ) {
    panelDimension = (_initCanvasHeight - 50) / _rows;

    leftPadding = 25;
    topPadding = 25;

    newCanvasWidth = panelDimension * _columns * ratio + 50;
    newCanvasHeight = _initCanvasHeight;
  } else {
    panelDimension = (_initCanvasWidth - 50) / _columns / ratio;
    leftPadding = 25;
    topPadding = 25;

    newCanvasWidth = _initCanvasWidth;
    newCanvasHeight = panelDimension * _rows + 50;
  }

  return {
    panelDimension,
    leftPadding,
    topPadding,
    newCanvasWidth,
    newCanvasHeight,
  };
};
