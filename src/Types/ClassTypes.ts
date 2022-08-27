export interface PanelObj {
    i: number;
    row: number;
    column: number;
    thisPanelsSnapPoints: number[];
    color: ColorObj;
    isSelected: boolean;
    isHovered: boolean;
    lineWidth: number;
    x: number;
    y: number;
    width: number;
    height: number;
    setColor: (key: ColorObjKey, color: string) => void;
    setIsSelected: (isSelected: boolean) => void;
    setIsHovered: (isHovered: boolean) => void;
    setLineWidth: (lineWidth: number) => void;
    toggleIsSelected: () => void;
    setDimensions: () => void;
    setIndex: (i: number) => void;
    setColorIndex: (i: number, j: number) => void;
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
    x: number;
    y: number;
    snapPointIndex: number;
    panelIndex: number;
  }

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
    translateString: string
    radius: number;
    x: number;
    y: number;
    row: number;
    column: number;
    pointIndexWithinPanel: number;
    panelIndex: number;
    pointIndexFullArray: number;
    strokeWidth: number;
    getX:() => number;
    getY:() => number;
    getTranslateString:() => string;
    setLabel: (label: string) => void;
    setColorObj: (colorObj: ColorObj) => void;
    setBackgroundColor: (color: string) => void;
    setBorderColor: (color: string) => void;
    setFontColor: (color: string) => void;
    setIsSquare: (isSquare: boolean) => void;
    setIsTriangle: (isTriangle: boolean) => void;
    createDimensions: (row: number, column: number, pointIndexWithinPanel: number) => void;
    toggleIsSelected: () => void;
    setIsSelected: (isSelected: boolean) => void;
    setIsHovered: (isHovered: boolean) => void;
  }

  export interface SignalLineObj {
    i: number
    origin: SnapPointCoordinates;
    destination: SnapPointCoordinates;
    color: ColorObj;
    lineWidth: number;
    isSelected: boolean;
    setIsSelected: (isSelected: boolean) => void;
    setEndCoordinates: (event) => void;
    updateColor: (color: string) => void;
    updateLineWidth: (lineWidth: number) => void;
  }