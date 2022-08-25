import { get } from "svelte/store";
import { writable } from "svelte/store";

import {
  isCtrl,
  width,
  height,
  updatePanels,
  snapPoints as snapPointsStore,
  setSelection,
  signalLines,
  rows,
  columns,
  snapPointsQuantity,
  isShifted,
} from "../store";

export class SelectableObjects {
  constructor() {}

  deSelect = () => {
    this.array.forEach((o) => o.setIsSelected(false));
    updatePanels();
  };

  // selectObjects = (arrayOfIndexes) => {
  //   let snapPointsClass = get(snapPointsStore);
  //   let signalLinesClass = get(signalLines);
  //   snapPointsClass.deSelect();
  //   this.snapPoints.deSelect();
  //   signalLinesClass.deSelect();

  //   let arrayOfCurrent = [];

  //   arrayOfIndexes.forEach((i) => {
  //     let current = this.array[i].isSelected;
  //     arrayOfCurrent.push(current);
  //   });

  //   if (!get(isCtrl || !get(isShifted))) {
  //     this.array.forEach((panel) => {
  //       panel.setIsSelected(false);
  //     });
  //   }

  //   arrayOfIndexes.forEach((panel, i) => {
  //     let x = arrayOfCurrent[i];
  //     this.array[panel].setIsSelected(!x);
  //   });

  //   setSelection("panels");
  //   updatePanels();
  // };
}
