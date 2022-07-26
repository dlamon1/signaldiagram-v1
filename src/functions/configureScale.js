import { get } from "svelte/store";

import {
  initCanvasWidth,
  initCanvasHeight,
  canvasWidth,
  canvasHeight,
  innerWidth,
  innerHeight,
  rows,
  columns,
  width,
  height,
} from "../store";

export const configureScale = () => {
  let scale;

  return {
    scale,
  };
};
