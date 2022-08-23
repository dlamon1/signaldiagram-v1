import { get, writable } from "svelte/store";
import { SignalLines } from "./classes/SignalLinesClass";
import { Panels } from "./classes/PanelsClass";
import { SnapPoints } from "./classes/SnapPointsClass";

export let topLevelSvgRef = writable(null);
export let gZoomWrapperRef = writable(null);
export let panelWrappersRef = writable(null);
export let selectedPanelRectsRef = writable(null);
export let snapPointsWrapper = writable(null);
export let snapPointBaseCircles = writable(null);
export let selectedSnapPointCirclesRef = writable(null);
export let coordinatesRef = writable(null);
export let temporarySignalLine = writable(null);
export let groups = writable(null);
export let groupsEnter = writable(null);
export let snapPointsGroupRef = writable(null);
export let snapPointsGroupEnterRef = writable(null);
export let snapPointPathRef = writable(null);
export let linesGroupRef = writable(null);
export let linesGroupEnterRef = writable(null);

export const opacity = writable(0.2);

export let transform = writable({
  k: 1,
  x: 0,
  y: 0,
});

export let svgRef;

export let isDrawingSignalLine = writable(false);
export const setIsDrawingSignalLine = (s) => {
  isDrawingSignalLine.update(($s) => ($s = s));
};

export let isExportDialogOpen = writable(false);

export let canvasRef = writable();
export let ctxRef = writable();
export let eRef = writable();
export const setERef = (ref) => {
  eRef.update(($value) => ($value = ref));
};

export let title = writable("");

export let toolbarWidth = writable(250);

export let directionArrowQuantity = writable(2);

export let snapPointsQuantity = writable(2);
export let snapPointDirection = writable("vertical");

// mode is select or draw
export const isDrawMode = writable(false);
export const isSelectMode = writable(true);
export const isMoveMode = writable(false);

// export let mode = writable("draw");
export let mode = writable("select");
export const setMode = (m) => {
  mode.update(($value) => ($value = m));
  if (m == "draw") {
    isSelectMode.update(($value) => ($value = false));
    isMoveMode.update(($v) => ($v = false));
    isDrawMode.update(($value) => ($value = true));
  }
  if (m == "select") {
    isDrawMode.update(($value) => ($value = false));
    isMoveMode.update(($v) => ($v = false));
    isSelectMode.update(($value) => ($value = true));
  }
  if (m == "move") {
    isDrawMode.update(($value) => ($value = false));
    isSelectMode.update(($value) => ($value = true));
    isMoveMode.update(($v) => ($v = true));
  }
};

export let snapPointLabel = writable("");

export let colorState = writable({
  snapPoint: {
    background: "#ffffff",
    outline: "#000000",
    font: "#000000",
  },
  panel: {
    background: "#ffffff",
    outline: "#000000",
    font: "#000000",
  },
  signalLine: {
    background: "#000000",
  },
});
export const setColorState = (key, value) => {
  colorState.update(($value) => {
    $value[key] = value;
    return $value;
  });
};

// panels, snappoints, signallines
export let selection = writable("panels");
export const setSelection = (type) => {
  selection.update(($value) => ($value = type));
};

export const setIsShifted = (boolean) => {
  isShifted.update(($value) => ($value = boolean));
};

export let isShifted = writable(false);

export let isCtrl = writable(false);
export const setIsCtrl = (boolean) => {
  isCtrl.update(($value) => ($value = boolean));
};

export let isMouseDown = writable(false);
export const setIsMouseDown = (boolean) => {
  isMouseDown.update(($value) => ($value = boolean));
};

export let scale = writable(1);

export let columns = writable(13);
export let rows = writable(5);

export let width = writable(160);
export let height = writable(320);
export let ratio = writable(get(width) / get(height));

// This is the size of the browser window minus the toolbar
// it does not zoom or pan
export let canvasWrapperWidth = writable(null);
export let canvasWrapperHeight = writable(null);

export let textInputRef = writable(null);

export let panels = writable(new Panels());
export let setPanels = (p) => {
  panels.update(($value) => ($value = p));
};
export let updatePanels = () => {
  panels.update(($value) => ($value = $value));
};

export let snapPoints = writable(new SnapPoints());
export const setSnapPoints = (p) => {
  snapPoints.update(($value) => ($value = p));
};
export const updateSnapPoints = (p) => {
  snapPoints.update(($value) => ($value = $value));
};
export let signalLines = writable(new SignalLines());
export const updateSignalLines = () => {
  signalLines.update(($value) => ($value = $value));
};

export const colorButtons = writable([
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

export let isRearView = writable(true);

export let isSelectingPanels = writable(true);
export let isSelectingSignalLines = writable(true);

export const isFullTile = writable(false);

export const isDragging = writable(false);

export let showCoordinates = writable(true);

export let showDirectionArrows = writable(true);

export let isPrinting = writable(false);
