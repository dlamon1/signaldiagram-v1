import { tickStep } from "d3";
import { get } from "svelte/store";
import { writable } from "svelte/store";

import { scale, screenAndPanelDimensions, width, height } from "../store";

export class Panels {
  array = [];

  constructor() {
    this._store = writable(this);
  }

  subscribe(subscriber) {
    return this._store.subscribe(subscriber);
  }

  addPanel(i, j, count, thisPanelsSnapPoints) {
    let newPanel = new Panel(i, j, count, thisPanelsSnapPoints);
    this.array.push(newPanel);
  }

  pushPanel(panel) {
    this.array.push(panel);
  }

  resetArray() {
    this.array = [];
  }
}

export class Panel {
  i;
  thisPanelsSnapPoints = [];
  colorIndex = 0;
  isSelected = false;
  color = {
    background: "#fff",
    border: "#000",
    font: "#000",
  };
  lineWidth = 0;
  scale = 1;
  x;
  y;
  width;
  height;

  constructor(i, j, count, thisPanelsSnapPoints) {
    this.row = i;
    this.column = j;
    this.i = count;
    this.setPanelDimension();
    this.setRatio();
    this.setColorIndex(i, j);
    this.setDimensions();
    this.setLineWidth();
    this.thisPanelsSnapPoints = thisPanelsSnapPoints;
  }

  setColor(key, color) {
    this.color[key] = color;
  }

  setIsSelected(boolean) {
    this.isSelected = boolean;
  }

  setLineWidth() {
    this.lineWidth = this.panelDimension / 65;
  }

  setRatio() {
    let w = get(width);
    let h = get(height);
    this.ratio = w / h;
  }

  setDimensions() {
    this.width = this.panelDimension * this.ratio;
    this.height = this.panelDimension;
    this.x = this.panelDimension * this.column * this.ratio + this.leftPadding;
    this.y = this.panelDimension * this.row + this.topPadding;
  }

  setPanelDimension() {
    let p = get(screenAndPanelDimensions);
    this.panelDimension = p.panelDimension;
    this.leftPadding = p.leftPadding;
    this.topPadding = p.topPadding;
  }

  setIndex(count) {
    this.i = count;
  }

  setColorIndex(i, j) {
    if ((i + j) % 2 === 1) {
      this.colorIndex = 1;
    }
  }
}
