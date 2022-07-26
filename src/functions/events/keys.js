import { get, derived } from "svelte/store";

import {
  isShifted,
  setIsShifted,
  isCtrl,
  setIsCtrl,
  mode,
  setMode,
  isSelectMode,
} from "../../store";

const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

export const handleKeyDown = (e) => {
  if (e.keyCode === 16 && !get(isShifted) && get(isSelectMode)) {
    setIsShifted(true);
    canvas.style.cursor = "crosshair";
  }

  // if ctrl is pressed, set isCtrl to true
  if (e.keyCode === 17 && !get(isCtrl) && !isMac && get(isSelectMode)) {
    setIsCtrl(true);
  }
  // if command on mac is pressed
  if (e.keyCode === 91 && isMac && get(isSelectMode)) {
    setIsCtrl(true);
  }

  // if (e.keyCode === 17 && !get(isCtrl) && !isMac) {
  //   // isCtrl = true;
  //   setIsCtrl(true)
  // }

  if (e.keyCode === 68) {
    // mode = "draw";
    setMode("draw");
  }
  if (e.keyCode === 83) {
    // mode = "select";
    setMode("select");
  }
};

export const handleKeyUp = (e) => {
  if (e.keyCode === 16) {
    setIsShifted(false);
    canvas.style.cursor = "default";
  }
  if (e.keyCode === 17 && !get(isCtrl) && !isMac) {
    // isCtrl = false;
    setIsCtrl(false);
  }
  if (e.keyCode === 91 && isMac) {
    // isCtrl = false;
    //console.log("command up");

    setIsCtrl(false);
  }
};
