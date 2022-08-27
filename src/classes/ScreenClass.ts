import type { ScreenObj } from "../Types/ClassTypes";

import { Panels } from "./PanelsClass";
import { SignalLines } from "./SignalLinesClass";
import { SnapPoints } from "./SnapPointsClass";

export class Screen implements ScreenObj {
  panels = null;
  snapPoints = null;
  signalLines = null;
  width = 0;
  height = 0;
  isRearView = true;

  constructor() {
    this.panels = new Panels();
    this.snapPoints = new SnapPoints();
    this.signalLines = new SignalLines();
  }
}
