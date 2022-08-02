import { get, writable } from "svelte/store";

import {
  isCtrl,
  screenAndPanelDimensions,
  width,
  height,
  updatePanels,
  snapPoints,
  setMode,
  setSelectionTab,
  setSelection,
  signalLines,
} from "../store";

export class Panels {
  array = [];

  constructor() {
    this._store = writable(this);
  }

  subscribe(subscriber) {
    return this._store.subscribe(subscriber);
  }

  addPanel(i, j, count, thisPanelsSnapPoints, oldPanel) {
    let newPanel = new Panel(i, j, count, thisPanelsSnapPoints, oldPanel);
    this.array.push(newPanel);
  }

  pushPanel(panel) {
    this.array.push(panel);
  }

  resetArray() {
    this.array = [];
  }

  deSelect = () => {
    this.array.forEach((p) => p.setIsSelected(false));
  };

  hoverPanel = (e) => {
    get(snapPoints).deHover();
    this.deHover();
    let i = e.target.__data__.i;
    this.array[i].setIsHovered(true);
  };

  deHover = () => {
    this.array.forEach((p) => p.setIsHovered(false));
    get(snapPoints).deHover();
    updatePanels();
  };

  selectPanel = (e) => {
    let snapPointsClass = get(snapPoints);
    let signalLinesClass = get(signalLines);
    snapPointsClass.deSelect();
    signalLinesClass.deSelect();

    let i = e.target.__data__.i;
    let current = this.array[i].isSelected;

    if (!get(isCtrl)) {
      this.array.forEach((p) => p.setIsSelected(false));
      this.array[i].setIsSelected(!current);
    }
    this.array[i].setIsSelected(!current);
    setSelectionTab("panels");
    setSelection("panels");
    updatePanels();
  };
}

export class Panel {
  i;
  thisPanelsSnapPoints = [];
  colorIndex = 0;
  isSelected = false;
  isHovered = false;
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

  constructor(i, j, count, thisPanelsSnapPoints, oldPanel) {
    this.row = i;
    this.column = j;
    this.i = count;
    this.setPanelDimension();
    this.setRatio();
    this.setColorIndex(i, j);
    this.setDimensions();
    this.setLineWidth();
    this.thisPanelsSnapPoints = thisPanelsSnapPoints;
    // oldPanel && this.copyFromOldPanel(oldPanel);
  }

  setIsHovered(boolean) {
    this.isHovered = boolean;
  }

  x = {
    i: 3,
    thisPanelsSnapPoints: [6, 7],
    colorIndex: 1,
    isSelected: false,
    color: {
      background: "#fff",
      border: "#000",
      font: "#000",
    },
    lineWidth: 2.361025641025641,
    scale: 1,
    x: 230.2,
    y: 159.56666666666666,
    width: 76.73333333333333,
    height: 153.46666666666667,
    row: 0,
    column: 3,
    panelDimension: 153.46666666666667,
    leftPadding: 0,
    topPadding: 159.56666666666666,
    ratio: 0.5,
  };

  copyFromOldPanel(oldPanel) {
    this.color = oldPanel.color;
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
