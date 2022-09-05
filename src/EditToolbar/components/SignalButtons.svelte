<script lang="ts">
  import {
    signalDirectionButtons,
    signalLines,
    panels,
    snapPoints,
    snapPointDirection,
  } from "../../store";
  import type { DirectionObj } from "../../store";
  import type { PanelObj, SnapPointObj } from "../../Types/ClassTypes";

  let selectedArray: PanelObj[] = [];

  const setSignalDirection = (direction: DirectionObj) => {
    // console.log(direction);
    selectedArray = [];
    let count = 0;
    let snapPointIndexCount = 0;

    // if (direction.initialDirection == $snapPointDirection) {
    snapPointIndexCount = Math.max(
      direction.points[0].y,
      direction.points[1].y
    );

    if (direction.initialDirection != $snapPointDirection) {
      snapPointIndexCount == 1
        ? (snapPointIndexCount = 0)
        : (snapPointIndexCount = 1);
    }

    $panels.array.forEach((p) => {
      if (p.isSelected) {
        selectedArray.push(p);
      }
    });

    if (!selectedArray.length) {
      return;
    }

    // Find starting snap point

    let cornerPanelIndexes = setCornerPanelIndexes(selectedArray);

    let startingSnapPointObj: SnapPointObj;

    let snapPointCount = 0;

    for (let i = 0; i < selectedArray.length - 1; i++) {
      // Get starting snap point
      startingSnapPointObj = getNextSnapPoint(
        direction,
        selectedArray,
        cornerPanelIndexes,
        startingSnapPointObj,
        snapPointCount
      );

      // Set signal line start
      $signalLines.setOriginSnapPointIndex(startingSnapPointObj);

      snapPointCount++;

      // Get next end point
      let nextSnapPoint = getNextSnapPoint(
        direction,
        selectedArray,
        cornerPanelIndexes,
        startingSnapPointObj,
        snapPointCount
      );

      // Set signal line end
      $signalLines.setDestinationSnapPointIndex(nextSnapPoint);

      // Add snap point
      $signalLines.addSignalLine();

      snapPointCount++;

      // Find next snap point
      $signalLines.nullOriginAndDestinationValues();
    }
  };

  const getStartSnapPoint = (
    direction: DirectionObj,
    selectedArray: PanelObj[],
    cornerPanelIndexes,
    snapPointIndexCount: number
  ) => {
    let panelIndex = cornerPanelIndexes[direction.pointOne];
    let panel = $panels.array[panelIndex];
    let snapPointIndex =
      panel.thisPanelsSnapPoints[direction.points[snapPointIndexCount].i];
    let obj = $snapPoints.array[snapPointIndex];

    return obj;
  };

  const getNextSnapPoint = (
    direction: DirectionObj,
    selectedArray: PanelObj[],
    cornerPanelIndexes,
    startingSnapPointObj,
    snapPointIndexCount: number
  ) => {
    console.log(snapPointIndexCount);

    if (!startingSnapPointObj) {
      let obj = getStartSnapPoint(
        direction,
        selectedArray,
        cornerPanelIndexes,
        snapPointIndexCount
      );

      return obj;
    }

    let prevCol = startingSnapPointObj.column;
    let prevRow = startingSnapPointObj.row;

    let nextCol = prevCol + direction.points[1].x;
    let nextRow = prevRow + direction.points[1].y;

    // return index of next panel withh column equal to nextCol and row equal to nextRow
    let panelIndex = selectedArray.findIndex(
      (p) => p.column == nextCol && p.row == nextRow
    );

    // find panel in panels with nextCol and nextRow
    let nextPanel: PanelObj = $panels.array.find((p) => {
      return p.column === nextCol && p.row === nextRow;
    });

    let nextSnapPointIndex =
      nextPanel.thisPanelsSnapPoints[direction.points[snapPointIndexCount].i];

    let obj = $snapPoints.array[nextSnapPointIndex];

    return obj;
  };

  const setCornerPanelIndexes = (arrayOfPanels: PanelObj[]) => {
    let cornerPanelIndexes = {
      topleft: arrayOfPanels[0].i,
      topright: arrayOfPanels[0].i,
      bottomleft: arrayOfPanels[0].i,
      bottomright: arrayOfPanels[0].i,
    };

    arrayOfPanels.forEach((p) => {
      if (
        p.x <= $panels.array[cornerPanelIndexes.topleft].x &&
        p.y <= $panels.array[cornerPanelIndexes.topleft].y
      ) {
        cornerPanelIndexes.topleft = p.i;
      }
      if (
        p.x >= $panels.array[cornerPanelIndexes.topright].x &&
        p.y <= $panels.array[cornerPanelIndexes.topright].y
      ) {
        cornerPanelIndexes.topright = p.i;
      }
      if (
        p.x <= $panels.array[cornerPanelIndexes.bottomleft].x &&
        p.y >= $panels.array[cornerPanelIndexes.bottomleft].y
      ) {
        cornerPanelIndexes.bottomleft = p.i;
      }
      if (
        p.x >= $panels.array[cornerPanelIndexes.bottomright].x &&
        p.y >= $panels.array[cornerPanelIndexes.bottomright].y
      ) {
        cornerPanelIndexes.bottomright = p.i;
      }
    });

    return cornerPanelIndexes;
  };

  let lineColor = "#000000";
  let strokeWidth = 8;
</script>

<div class="container">
  {#each $signalDirectionButtons as direction}
    <div class="button-container">
      <button on:click={() => setSignalDirection(direction)}>
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <g transform-origin="50 50" transform={direction.transform}>
            <path
              d="M 0,15 L 100,15 L 100,60 L 0,60 L 0,100 L 100,100"
              stroke={lineColor}
              fill="transparent"
              stroke-width={strokeWidth}
            />
            <path
              d="M 40,0 L 40,30 L 65,15 Z"
              fill="transparent"
              stroke={lineColor}
              stroke-width={strokeWidth}
            />
          </g>
        </svg>
      </button>
    </div>
  {/each}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    padding-left: 6px;
  }

  .button-container {
    width: 90%;
    height: 90%;
    margin-top: 10px;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 80%;
    height: 80%;
  }
</style>
