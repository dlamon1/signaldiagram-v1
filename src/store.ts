/* eslint-disable no-self-assign */
import { get, writable } from "svelte/store";
import { SignalLines } from "./classes/SignalLinesClass";
import { Panels } from "./classes/PanelsClass";
import { SnapPoints } from "./classes/SnapPointsClass";

import type {
  PanelObj,
  SnapPointObj,
  SignalLineObj,
  XYCoordinates,
} from "./Types/ClassTypes";

import type * as d3 from "d3";

import type { Writable } from "svelte/store";

export const topLevelSvgRef = writable(null);
export const gZoomWrapperRef = writable(null);

export const groups = writable(null);
export const groupsEnter: Writable<
  d3.Selection<SVGGElement, PanelObj, HTMLElement, any>
> = writable(null);

export const snapPointsGroupRef = writable(null);
// export const snapPointsGroupEnterRef = writable(null);
export const snapPointsGroupEnterRef: Writable<
  d3.Selection<SVGGElement, SnapPointObj, HTMLElement, any>
> = writable(null);
export const snapPointPathRef = writable(null);

export const linesGroupRef = writable(null);
export const linesGroupEnterRef: Writable<
  d3.Selection<SVGGElement, SignalLineObj, HTMLElement, any>
> = writable(null);

export const temporarySignalLine = writable(null);

export const opacity: Writable<number> = writable(0.1);

interface TransformObj {
  k: number;
  x: number;
  y: number;
}

export const transform: Writable<TransformObj> = writable({
  k: 1,
  x: 0,
  y: 0,
});

export const isDrawingSignalLine: Writable<boolean> = writable(false);
export const setIsDrawingSignalLine = (s: boolean) => {
  isDrawingSignalLine.update(() => s);
};

export const isDrawingSelectLine: Writable<boolean> = writable(false);
export const setIsDrawingSelectLine = (s: boolean) => {
  isDrawingSignalLine.update(() => s);
};

export const isExportDialogOpen: Writable<boolean> = writable(false);

export const title: Writable<string> = writable("");

export const toolbarWidth: Writable<number> = writable(250);

type SnapPointDirection = "vertical" | "horizontal";
export const snapPointsQuantity: Writable<number> = writable(2);
export const snapPointDirection: Writable<SnapPointDirection> =
  writable("vertical");
export const directionArrowQuantity: Writable<number> = writable(2);

export const isDrawMode: Writable<boolean> = writable(false);
export const isSelectMode: Writable<boolean> = writable(true);
export const isMoveMode: Writable<boolean> = writable(false);

type Mode = "select" | "draw";

export const mode: Writable<Mode> = writable("select");
export const setMode = (m: Mode) => {
  mode.update(() => m);
  if (m == "draw") {
    isSelectMode.update(() => false);
    isDrawMode.update(() => true);
  }
  if (m == "select") {
    isDrawMode.update(() => false);
    isSelectMode.update(() => true);
  }
};

export const snapPointLabel: Writable<string> = writable("");

export const lineWidthState: Writable<number> = writable(1);

export const colorState = writable({
  snapPoint: {
    background: "#ffffff",
    border: "#000000",
    font: "#000000",
  },
  panel: {
    background: "#ffffff",
    border: "#000000",
    font: "#000000",
  },
  signalLine: {
    background: "#000000",
    border: "#ffffff",
    font: "#000000",
  },
});
export const setSignalLineColor = (color: string) => {
  let newColorObj = get(colorState);
  newColorObj.signalLine.background = color;
  colorState.update(() => newColorObj);
};

type Selection = "panels" | "snappoints" | "signallines";

export const selection: Writable<Selection> = writable("panels");
export const setSelection = (type: Selection) => {
  selection.update(() => type);
};

export const setIsShifted = (boolean: boolean) => {
  isShifted.update(() => boolean);
};

export const isShifted: Writable<boolean> = writable(false);

export const isCtrl = writable(false);
export const setIsCtrl = (boolean: boolean) => {
  isCtrl.update(() => boolean);
};

export const isMouseDown: Writable<boolean> = writable(false);
export const setIsMouseDown = (boolean: boolean) => {
  isMouseDown.update(() => boolean);
};

export const scale: Writable<number> = writable(1);

export const columns: Writable<number> = writable(13);
export const rows: Writable<number> = writable(5);

export const width: Writable<number> = writable(160);
export const height: Writable<number> = writable(320);
export const ratio: Writable<number> = writable(get(width) / get(height));

// This is the size of the browser window minus the toolbar
// it does not zoom or pan
export const canvasWrapperWidth: Writable<number> = writable(null);
export const canvasWrapperHeight: Writable<number> = writable(null);

export const textInputRef = writable(null);

export const panels = writable(new Panels());

export const updatePanels = () => {
  panels.update(($value) => ($value = $value));
};

export const snapPoints = writable(new SnapPoints());

export const updateSnapPoints = () => {
  snapPoints.update(($value) => ($value = $value));
};

export const signalLines = writable(new SignalLines());
export const updateSignalLines = () => {
  signalLines.update(($value) => ($value = $value));
};

export const colorButtons: Writable<string[]> = writable([
  "#E401CD",
  // "#FF85B5",
  "#FA1407",
  "#FF7A46",
  "#FF9A23",
  // "#FFB800",
  "#FFDB20",
  "#FFF859",
  "#64FF4A",
  "#00E883",
  "#00B13D",
  "#4FFFE7",
  "#00e0ff",
  "#0193FA",
  "#005CFA",
  "#000DDD",
  "#6F00E5",
  "#8850FF",
  "#000000",
  "#404040",
  "#5c5c5c",
  "#787878",
  "#939393",
  "#afafaf",
  "#cbcbcb",
  "#ffffff",
]);

export type DirectionObj = {
  initialDirection: "vertical" | "horizontal";
  transform: string;
  points: XYCoordinates[];
  pointOne: InitalPoint;
};

type InitalPoint = "topleft" | "topright" | "bottomleft" | "bottomright";

export const signalDirectionButtons: Writable<DirectionObj[]> = writable([
  {
    points: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ],
    initialDirection: "horizontal",
    transform: "rotate(0) scale(.8)",
    pointOne: "topleft",
  },
  {
    points: [
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ],
    initialDirection: "horizontal",
    transform: "rotate(180) scale(.8, -.8)",
    pointOne: "topright",
  },
  {
    points: [
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: 0, y: 0 },
    ],
    initialDirection: "horizontal",
    transform: "rotate(180) scale(.8)",
    pointOne: "bottomright",
  },
  {
    points: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
    ],
    initialDirection: "horizontal",
    transform: "rotate(0) scale(.8, -.8)",
    pointOne: "bottomleft",
  },
  {
    points: [
      { x: 0, y: 1 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
    initialDirection: "vertical",
    transform: "rotate(270) scale(.8)",
    pointOne: "bottomleft",
  },
  {
    points: [
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ],
    initialDirection: "vertical",
    transform: "rotate(270) scale(.8, -.8)",
    pointOne: "bottomright",
  },
  {
    points: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    initialDirection: "vertical",
    transform: "rotate(90) scale(.8, -.8)",
    pointOne: "topleft",
  },
  {
    points: [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ],
    initialDirection: "vertical",
    transform: "rotate(90) scale(.8)",
    pointOne: "topright",
  },
]);

export const isRearView: Writable<boolean> = writable(false);

export const isSelectingPanels: Writable<boolean> = writable(true);
export const isSelectingSignalLines: Writable<boolean> = writable(true);

export const showCoordinates: Writable<boolean> = writable(true);

export const showDirectionArrows: Writable<boolean> = writable(true);

export const isChrome: Writable<boolean> = writable(false);
