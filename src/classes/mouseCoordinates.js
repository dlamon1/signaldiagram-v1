import { get } from "svelte/store";
import { snapPoints, updateMouseCoordinates } from "../store";
import { handleHover, isSnapPointHovered } from "../functions/HandleHover";

export class MouseCoordinates {
  constructor() {
    this.origin = { x: null, y: null, i: null };
    this.end = { x: null, y: null, i: null };
    this.isSelected = false;
    this.isHovered = false;
    this.i = null;
    this.num = 0;
    this.closestSnapPoint = {
      origin: {
        x: null,
        y: null,
        i: null,
      },
      end: {
        x: null,
        y: null,
        i: null,
      },
    };
    this.closestSnapInit = {
      origin: {
        x: null,
        y: null,
        i: null,
      },
      end: {
        x: null,
        y: null,
        i: null,
      },
    };
    this.isDragging = false;
    this.isDrawingSignalLine = false;
  }

  setIsDrawingSignalLine(isDrawingSignalLine) {
    this.isDrawingSignalLine = isDrawingSignalLine;
  }

  setIsDragging(isDragging) {
    this.isDragging = isDragging;
  }

  setMouseClickOrigin(e) {
    // console.log(e);
    this.origin.x = e.x;
    this.origin.y = e.y;
  }

  setMouseEnd(e) {
    this.end.x = e.x;
    this.end.y = e.y;
    updateMouseCoordinates();
  }

  setSnapPointOrigin(e) {
    get(snapPoints).forEach((snapPoint) => {
      if (!isSnapPointHovered(e, snapPoint)) return;
      this.closestSnapPoint.origin.x = snapPoint.x;
      this.closestSnapPoint.origin.y = snapPoint.y;
      this.closestSnapPoint.origin.i = snapPoint.i;
      // this.isDrawingSignalLine = true
    });
  }

  setSnapPointEnd(e) {
    get(snapPoints).forEach((snapPoint) => {
      if (!isSnapPointHovered(e, snapPoint)) return;
      this.closestSnapPoint.end.x = snapPoint.x;
      this.closestSnapPoint.end.y = snapPoint.y;
      this.closestSnapPoint.end.i = snapPoint.i;
    });
  }

  resetSnapPoint() {
    this.closestSnapPoint = {
      origin: {
        x: null,
        y: null,
        i: null,
      },
      end: {
        x: null,
        y: null,
        i: null,
      },
    };
    this.origin = { x: null, y: null, i: null };
    this.end = { x: null, y: null, i: null };
  }

  setIsSelected(isSelected) {
    this.isSelected = isSelected;
  }

  setIsHovered(isHovered) {
    this.isHovered = isHovered;
  }

  setI(i) {
    this.i = i;
  }
}
