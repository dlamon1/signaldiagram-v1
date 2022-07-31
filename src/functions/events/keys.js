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
    let body = document.getElementById("canvas-wrapper");
    // body.style.cursor = "crosshair";
  }

  // if ctrl is pressed, set isCtrl to true
  if (e.keyCode === 17 && !get(isCtrl) && !isMac && get(isSelectMode)) {
    // console.log("ctrl on");

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

  if (e.keyCode === 77) {
    setMode("move");
  }

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
    let body = document.getElementById("canvas-wrapper");

    // body.style.cursor = "default";
  }
  // console.log(get(isCtrl));
  if (e.keyCode === 17 && get(isCtrl) && !isMac) {
    setIsCtrl(false);
  }
  if (e.keyCode === 91 && isMac) {
    setIsCtrl(false);
  }
};
