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
    // Find starting snap point
    // Find starting snap point

    let cornerPanelIndexes = setCornerPanelIndexes(selectedArray);

    // Get starting snap point
    // Get starting snap point
    // Get starting snap point
    let startingSnapPointObj = getStartSnapPoint(
      direction,
      selectedArray,
      cornerPanelIndexes,
      snapPointIndexCount
    );

    // Set signal line start
    // Set signal line start
    // Set signal line start
    $signalLines.setOriginSnapPointIndex(startingSnapPointObj);

    if ($snapPointDirection == direction.initialDirection) {
      snapPointIndexCount -= 1;
    }

    // Get next end point
    // Get next end point
    // Get next end point
    let nextSnapPoint = getNextSnapPoint(
      direction,
      selectedArray,
      cornerPanelIndexes,
      startingSnapPointObj,
      snapPointIndexCount
    );

    // console.log(nextSnapPoint);

    // Set signal line end
    // Set signal line end
    // Set signal line end
    $signalLines.setDestinationSnapPointIndex(nextSnapPoint);

    // Add snap point
    // Add snap point
    // Add snap point
    $signalLines.addSignalLine();

    // Signal line start is previous end
    // Find next snap point

    $signalLines.nullOriginAndDestinationValues();
  };

  const getStartSnapPoint = (
    direction: DirectionObj,
    selectedArray: PanelObj[],
    cornerPanelIndexes,
    snapPointIndexCount: number
  ) => {
    // console.log(selectedArray);
    // console.log(cornerPanelIndexes);
    let panelIndex = cornerPanelIndexes[direction.pointOne];
    let panel = $panels.array[panelIndex];
    let snapPointIndex = panel.thisPanelsSnapPoints[snapPointIndexCount];
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
    // console.log(direction);
    // console.log(selectedArray);
    // console.log(cornerPanelIndexes);
    // console.log(startingSnapPointObj);

    let prevCol = startingSnapPointObj.column;
    let prevRow = startingSnapPointObj.row;

    let nextCol = prevCol + direction.points[1].x;
    let nextRow = prevRow + direction.points[1].y;

    // find panel in panels with nextCol and nextRow
    let nextPanel: PanelObj = $panels.array.find((p) => {
      return p.column === nextCol && p.row === nextRow;
    });

    let nextSnapPointIndex =
      nextPanel.thisPanelsSnapPoints[snapPointIndexCount];

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
