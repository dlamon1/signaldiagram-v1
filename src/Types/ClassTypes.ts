export interface PanelObj {
  i: number;
  row: number;
  column: number;
  thisPanelsSnapPoints: number[];
  color: ColorObj;
  isSelected: boolean;
  isHovered: boolean;
  lineWidth: number;
  lineWidthMultiplier: number;
  x: number;
  y: number;
  width: number;
  height: number;
  reverseIndex: number;
  isHidden: boolean;
  colorIndex: number;
  getDimensions: () => { x: number; y: number };
  setColor: (key: ColorObjKey, color: string) => void;
  setIsSelected: (isSelected: boolean) => void;
  setIsHovered: (isHovered: boolean) => void;
  setLineWidth: (lineWidth: number) => void;
  toggleIsSelected: () => void;
  setDimensions: () => void;
  setIndex: (i: number) => void;
  setColorIndex: (i: number, j: number) => void;
  setLineWidthMultiplier: (multiplier: number) => void;
  getCoordinateText: () => string;
  setIsHidden: (isHidden: boolean) => void;
}

export interface ColorObj {
  background: string;
  border: string;
  font: string;
}

export type ColorObjKey = "background" | "border" | "font";

export interface LoadPanelObj {
  row: number;
  column: number;
  i: number;
  thisPanelsSnapPoints: number[];
  color: ColorObj;
  reverseIndex: number;
}

export interface LoadSnapPointObj {
  row: number;
  column: number;
  pointIndexWithinPanel: number;
  panelIndex: number;
  pointIndexFullArray: number;
  isTriangle: boolean;
  isSquare: boolean;
  color: ColorObj;
  label: string;
}

export type SnapPointCoordinates = {
  snapPointIndex: number;
  panelIndex: number;
  pointIndexWithinPanel: number;
};

export interface LoadSignalLineObj {
  origin: SnapPointCoordinates;
  destination: SnapPointCoordinates;
  color: ColorObj;
}

export interface SnapPointObj {
  isSquare: boolean;
  isCircle: boolean;
  isTriangle: boolean;
  label: string;
  isSelected: boolean;
  isHovered: boolean;
  color: ColorObj;
  translateString: string;
  radius: number;
  x: number;
  y: number;
  row: number;
  column: number;
  pointIndexWithinPanel: number;
  panelIndex: number;
  pointIndexFullArray: number;
  strokeWidth: number;
  isHidden: boolean;
  xOffset: number;
  yOffset: number;
  getX: () => number;
  getY: () => number;
  getTranslateString: () => string;
  setLabel: (label: string) => void;
  setColorObj: (colorObj: ColorObj) => void;
  setBackgroundColor: (color: string) => void;
  setBorderColor: (color: string) => void;
  setFontColor: (color: string) => void;
  setIsSquare: (isSquare: boolean) => void;
  setIsTriangle: (isTriangle: boolean) => void;
  createDimensions: (
    row: number,
    column: number,
    pointIndexWithinPanel: number
  ) => void;
  toggleIsSelected: () => void;
  setIsSelected: (isSelected: boolean) => void;
  setIsHovered: (isHovered: boolean) => void;
  setIsHidden: (isHidden: boolean) => void;
  getLabelString: () => string;
}

export interface SignalLineObj {
  i: number;
  origin: SnapPointCoordinates;
  destination: SnapPointCoordinates;
  color: ColorObj;
  lineWidth: number;
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
  setEndCoordinates: (event) => void;
  updateColor: (color: string) => void;
  updateLineWidth: (lineWidth: number) => void;
  getLengthInMM: () => number;
  getLineWidth: () => number;
}

export type PanelsType = {
  array: PanelObj[];
  selectedIndexes: number[];
  setArrayFromLoad: (array: LoadPanelObj[]) => void;
  deSelect: () => void;
  updatePanelArray: () => void;
  initArray: (columns: number, rows: number) => void;
  addPanel: (
    row: number,
    column: number,
    index: number,
    thisPanelsSnapPoints: number[],
    colorObj: ColorObj,
    reverseIndex: number
  ) => void;
  selectPanels: (arrayOfIndexes: number[]) => void;
  togglePanels: (arrayOfIndexes: number[]) => void;
  toggleHidePanels: (arrayOfIndexes: number[]) => void;
};

export type SnapPointsType = {
  array: SnapPointObj[];
  selectedSnapPointIndexes: number[];
  setArrayFromLoad: (array: LoadSnapPointObj[]) => void;
  deSelect: () => void;
  addSnapPoint: (
    row: number,
    column: number,
    pointIndexWithinPanel: number,
    panelIndex: number,
    pointIndexFullArray: number
  ) => void;
  resetArray: () => void;
  getXCoordinate: (snapPoint: SnapPointObj) => number;
  getYCoordinate: (snapPoint: SnapPointObj) => number;
  selectSnapPoints: (arrayOfIndexes: number[]) => void;
  toggleSnapPoints: (arrayOfIndexes: number[]) => void;
  selectSnapPoint: (d3Object: any) => void;
  removeLabel: () => void;
  setIsSquares: (isSquare: boolean) => void;
  setIsTriangles: (isTriangle: boolean) => void;
  setXOffsets: (value: number) => void;
  setYOffsets: (value: number) => void;
};

export type SignalLinesType = {
  array: SignalLineObj[];
  origin: SnapPointCoordinates;
  destination: SnapPointCoordinates;
  mouse: XYCoordinates;
  setArrayFromLoad: (array: LoadSignalLineObj[]) => void;
  getSnapPointCoordinates: (
    signalLineIndex: number,
    key: SnapPointCoordinatesKey
  ) => XYCoordinates;
  getPanelIndex: (row: number, column: number) => number;
  nullDestinationSnapPointIndex: () => void;
  setOriginSnapPointIndex: (snapPoint: SnapPointObj) => void;
  nullOriginAndDestinationValues: () => void;
  setDestinationSnapPointIndex: (snapPoint: SnapPointObj) => void;
  setMousePosition: (event: XYCoordinates) => void;
  addSignalLine: () => void;
  removeSignalLine: (line: SignalLineObj) => void;
  selectSignalLine: (index: number) => void;
  selectSignalLines: (arrayOfIndexes: number[]) => void;
  deSelect: () => void;
  toggleSignalLine: (index: number) => void;
};

export type SnapPointCoordinatesKey = "origin" | "destination";

export type XYCoordinates = {
  x: number;
  y: number;
};

export interface ScreenObj {
  panels: PanelsType;
  snapPoints: SnapPointsType;
  signalLines: SignalLinesType;
  width: number;
  height: number;
  isRearView: boolean;
  columns: number;
  rows: number;
  name: string;
  isSelected: boolean;
  widthMM: number;
  heightMM: number;
}
