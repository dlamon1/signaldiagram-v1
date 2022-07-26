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
} from "../store";

export const configurePanelDimensionsForScreen = () => {
  let panelDimension;
  let leftPadding;
  let topPadding;
  let newCanvasWidth;
  let newCanvasHeight;

  let _initCanvasWidth = get(innerWidth) - get(toolbarWidth);
  let _initCanvasHeight = get(innerHeight);
  let _rows = get(rows);
  let _columns = get(columns);
  let _width = get(width);
  let _height = get(height);

  let ratio = _width / _height;

  if (
    (_initCanvasWidth - 100) / _columns / ratio >
    (_initCanvasHeight - 100) / _rows
  ) {
    // console.log("if is constraining");
    panelDimension = (_initCanvasHeight - 50) / _rows;

    leftPadding = (_initCanvasWidth - panelDimension * ratio * _columns) / 2;
    topPadding = 25;

    newCanvasWidth = panelDimension * _columns * ratio + 50;
    newCanvasHeight = _initCanvasHeight;
  } else {
    // console.log("else is constraining");
    panelDimension = (_initCanvasWidth - 50) / _columns / ratio;
    leftPadding = 25;
    topPadding = (_initCanvasHeight - panelDimension * _rows) / 2;

    newCanvasWidth = _initCanvasWidth;
    newCanvasHeight = panelDimension * _rows + 50;
  }
  newCanvasHeight = _initCanvasHeight;
  newCanvasWidth = _initCanvasWidth;

  return {
    panelDimension,
    leftPadding,
    topPadding,
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
