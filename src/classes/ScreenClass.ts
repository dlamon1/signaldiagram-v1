import { get } from "svelte/store";

import type { ScreenObj } from "../Types/ClassTypes";

import { Panels } from "./PanelsClass";
import { SignalLines } from "./SignalLinesClass";
import { SnapPoints } from "./SnapPointsClass";

import { screens } from "../store";

export class Screen implements ScreenObj {
  panels = null;
  snapPoints = null;
  signalLines = null;
  width = 0;
  height = 0;
  isRearView = false;
  columns = null;
  rows = null;
  name = null;
  isSelected = false;
  index = undefined;
  widthMM: number;
  heightMM: number;
  snapPointDirection = null;
  snapPointQuantity = 2;
  showCoordinates = true;
  showDirectionArrows = true;
  opacity = 0.25;

  constructor(
    columns: number,
    rows: number,
    width: number,
    height: number,
    widthMM: number,
    heightMM: number,
    name: string
  ) {
    this.name = name;
    this.columns = columns;
    this.rows = rows;
    this.width = width;
    this.height = height;
    this.widthMM = widthMM;
    this.heightMM = heightMM;
    this.snapPointDirection = "vertical";

    this.index = get(screens).length;

    this.panels = new Panels(this.index);
    this.snapPoints = new SnapPoints(this.index);
    this.signalLines = new SignalLines(this.index);
  }

  load(saveObj: ScreenObj) {
    this.isRearView = saveObj.isRearView;
    this.opacity = saveObj.opacity;
    this.snapPointQuantity = saveObj.snapPointQuantity;
    this.snapPointDirection = saveObj.snapPointDirection;
    this.showCoordinates = saveObj.showCoordinates;

    this.panels.load(saveObj.panels);
    this.snapPoints.load(saveObj.snapPoints);
    this.signalLines.load(saveObj.signalLines.array);
  }
}
