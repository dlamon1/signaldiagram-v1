import { get, writable } from "svelte/store";
import { MouseCoordinates } from "./classes/mouseCoordinates";
import { SignalLines } from "./classes/SignalLinesClass";
import { Panels } from "./classes/PanelsClass";
import { SnapPoints } from "./classes/SnapPointsClass";

export let isExportDialogOpen = writable(false);

export let mouseCoordinates = writable(new MouseCoordinates());
export const updateMouseCoordinates = () => {
  mouseCoordinates.update(($m) => ($m = $m));
};

export let canvasRef = writable();
export let ctxRef = writable();
export let eRef = writable();
export const setERef = (ref) => {
  eRef.update(($value) => ($value = ref));
};

export let title = writable("");

export let toolbarWidth = writable(250);

export let snapPointsQuantity = writable(2);
export let snapPointDirection = writable("vertical");

// mode is select or draw
export const isDrawMode = writable(true);
export const isSelectMode = writable(false);
export const isMoveMode = writable(false);

export let mode = writable("draw");
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

export let screenAndPanelDimensions = writable({
  panelDimension: null,
  leftPadding: null,
  topPadding: null,
  newCanvasWidth: null,
  newCanvasHeight: null,
});

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

// panels, snapPoints, signallines
export let selection = writable("panels");
export const setSelection = (type) => {
  selection.update(($value) => ($value = type));
};

// panels, snapPoints, lines
export let selectionTab = writable("panels");
export const setSelectionTab = (tab) => {
  selectionTab.update(($value) => ($value = tab));
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

export let svgRef = writable(null);

export let columns = writable(14);
export let rows = writable(4);

export let width = writable(1);
export let height = writable(2);
export let ratio = writable(get(width) / get(height));

export let canvasWrapperHeight = writable(1);
export let canvasWrapperWidth = writable(1);

export let innerWidth = writable(window.innerWidth - 10);
export let innerHeight = writable(window.innerHeight - 10);

export let initCanvasWidth = writable(2200);
export let initCanvasHeight = writable(1700);

export let canvasWidth = writable(1100 * 2);
export let canvasHeight = writable(850 * 2);

export let textInputRef = writable(null);

export let panelHoverToDraw = writable([]);
export let panelSelectedOverlayToDraw = writable([]);
export let signalLineHoverToDraw = writable([]);
export let signalLineSelectedOverlayToDraw = writable([]);
export let snapPointHoverTodraw = writable([]);
export let isSelectingSnapPoints = writable([]);
export let snapPointSelectedOverlayToDraw = writable([]);

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

export let labels = writable([]);
export let squares = writable([]);
export let circles = writable([]);

export let hoveredPanels = writable([]);
export const setHoveredPanels = (panels) => {
  hoveredPanels.update(($value) => ($value = panels));
};

export let hoveredSignalLines = writable([]);
export const setHoveredSignalLines = (signalLines) => {
  hoveredSignalLines.update(($value) => ($value = signalLines));
};

export let hoveredSnapPoints = writable([]);
export const setHoveredSnapPoints = (snapPoints) => {
  hoveredSnapPoints.update(($value) => ($value = snapPoints));
};

export let hoveredSquares = writable([]);
export const setHoveredSquares = (squares) => {
  hoveredSquares.update(($value) => ($value = squares));
};

export let selectedPanels = writable([]);
export const setSelectedPanels = (panels) => {
  selectedPanels.update(($value) => ($value = panels));
};

export let selectedSignalLines = writable([]);
export const setSelectedSignalLines = (signalLines) => {
  selectedSignalLines.update(($value) => ($value = signalLines));
};

export let selectedSnapPoints = writable([]);
export const setSelectedSnapPoints = (snapPoints) => {
  selectedSnapPoints.update(($value) => ($value = snapPoints));
};

export let selectedSquares = writable([]);
export const setSelectedSquares = (squares) => {
  selectedSquares.update(($value) => ($value = squares));
};

export const clearAllSelections = () => {
  hoveredSignalLines.update(($v) => ($v = []));
  hoveredSignalLines.update(($v) => ($v = []));
  hoveredSnapPoints.update(($v) => ($v = []));
  hoveredSnapPoints.update(($v) => ($v = []));
  hoveredPanels.update(($v) => ($v = []));
  hoveredPanels.update(($v) => ($v = []));
  hoveredSquares.update(($v) => ($v = []));
  hoveredSquares.update(($v) => ($v = []));
  selectedPanels.update(($v) => ($v = []));
  selectedPanels.update(($v) => ($v = []));
  selectedSignalLines.update(($v) => ($v = []));
  selectedSignalLines.update(($v) => ($v = []));
  selectedSnapPoints.update(($v) => ($v = []));
  selectedSnapPoints.update(($v) => ($v = []));
  selectedSquares.update(($v) => ($v = []));
  selectedSquares.update(($v) => ($v = []));
};

export let colors = writable({
  // one: "red",
  // two: "green"
  one: "#fff",
  two: "#ddd",
});

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

export const panelColors = writable({
  2: "#fff",
  3: "#ddd",
});

export const labelColors = writable(["red", "green", "blue", "yellow"]);

export let isRearView = writable(true);

export let isSelectingPanels = writable(true);
export let isSelectingSignalLines = writable(true);

export const isFullTile = writable(false);

export const isDragging = writable(false);

export let showCoordinates = writable(true);

export let showDirectionArrows = writable(true);

export let isPrinting = writable(false);
