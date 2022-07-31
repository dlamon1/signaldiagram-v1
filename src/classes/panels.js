import { get } from "svelte/store";

import { scale, screenAndPanelDimensions } from "../store";

export class Panels {
  array = [];

  addPanel(i, j, count, thisPanelsSnapPoints) {
    let newPanel = new Panel(i, j);
    this.array = newPanel;
  }
}

export class Panel {
  thisPanelsSnapPoints = [];
  colorIndex = 0;
  isSelected = false;
  color = {
    background: "#fff",
    border: "#000",
    font: "#000",
  };
  constructor(i, j, count, thisPanelsSnapPoints) {
    this.index = count;
    setPanelDimension();
    setRatio();
    setColorIndex(i, j);
    setCoodinates(i, j);
    setScale();
    setDimensions();
    setLineWidth();
    this.thisPanelsSnapPoints = thisPanelsSnapPoints;
  }

  setLineWidth() {
    this.setLineWidth = this.panelDimension / 25;
  }

  setRatio() {
    let w = get(this.width);
    let h = get(this.height);
    this.ratio = w / h;
  }

  setDimensions() {
    this.width = this.panelDimension * this.ratio * this.scale;
    this.height = this.panelDimension * this.scale;
    this.x =
      this.panelDimension * j * this.ratio * this.scale + this.leftPadding;
    this.y = this.panelDimension * i * this.scale + this.topPadding;
  }

  setPanelDimension() {
    let p = get(screenAndPanelDimensions);
    this.panelDimension = p.panelDimension;
    this.leftPadding = p.leftPadding;
    this.topPadding = p.topPadding;
  }

  setScale() {
    let s = get(scale);
    this.scale = s;
    this.scale = 1;
  }

  setIndex(count) {
    this.i = count;
  }

  setCoodinates(i, j) {
    this.row = i;
    this.column = j;
  }

  setColorIndex(i, j) {
    if ((i + j) % 2 === 1) {
      colorIndex = 1;
    }
  }
}
