import { get } from "svelte/store";

import {
  isShifted,
  setIsShifted,
  isCtrl,
  setIsCtrl,
  setMode,
  isSelectMode,
} from "../../store";

const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

export const handleKeyDown = (e) => {
  if (e.keyCode === 16 && !get(isShifted)) {
    setIsShifted(true);
  }

  if (e.keyCode === 16 && get(isShifted) && get(isSelectMode)) {
    let body = document.getElementById("canvas-wrapper");
    body.style.cursor = "crosshair";
  }

  // if ctrl is pressed, set isCtrl to true
  if (e.keyCode === 17 && !get(isCtrl) && !isMac && get(isSelectMode)) {
    setIsCtrl(true);
  }
  // if command on mac is pressed
  if (e.keyCode === 91 && isMac && get(isSelectMode)) {
    setIsCtrl(true);
  }

  if (e.keyCode === 68 && get(isShifted)) {
    setMode("draw");
  }
  if (e.keyCode === 83 && get(isShifted)) {
    setMode("select");
  }
};

export const handleKeyUp = (e) => {
  if (e.keyCode === 16) {
    setIsShifted(false);
    let body = document.getElementById("canvas-wrapper");

    body.style.cursor = "default";
  }
  // console.log(get(isCtrl));
  if (e.keyCode === 17 && get(isCtrl) && !isMac) {
    setIsCtrl(false);
  }
  if (e.keyCode === 91 && isMac) {
    setIsCtrl(false);
  }
};
