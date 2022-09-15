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

  let directionPointIndex = 0;

  const setSignalDirection = (direction: DirectionObj) => {
    // console.log(direction);
    selectedArray = [];

    let directionInstructionPosition = 1;

    const incrementDirectionInstructionPosition = () => {
      directionInstructionPosition += 1;
      if (directionInstructionPosition == 5) {
        directionInstructionPosition = 1;
      }
    };

    // Create array with all selected panels
    $panels.array.forEach((p) => {
      if (p.isSelected) {
        selectedArray.push(p);
      }
    });

    // return if no panels are selected
    if (!selectedArray.length) {
      return;
    }

    // Set bounds
    let cornerPanelIndexes = setCornerPanelIndexes(selectedArray);

    const getPrevPanel = () => {
      let panelIndex = cornerPanelIndexes[direction.pointOne];

      let panel = $panels.array[panelIndex];

      return panel;
    };

    let prevPanel: PanelObj = getPrevPanel();

    let initSnapPointIndex =
      prevPanel.thisPanelsSnapPoints[direction.points[0].i[0]];

    let initSnapPointObj = $snapPoints.array[initSnapPointIndex];

    // Set signal lie class origin snap point
    $signalLines.setOriginSnapPointIndex(initSnapPointObj);

    let isSettingDestination = true;

    const checkForNextPanelInCurrentDirection = (column, row) => {
      let directionInstruction = direction.points[directionInstructionPosition];

      column = column + directionInstruction.x;
      row = row + directionInstruction.y;

      let nextPanelIndex = selectedArray.findIndex((p) => {
        return p.column === column && p.row === row;
      });

      return nextPanelIndex;
    };

    const getNexPanelObj = () => {
      let column = prevPanel.column;
      let row = prevPanel.row;

      let nextPanelExists = checkForNextPanelInCurrentDirection(column, row);

      if (nextPanelExists < 0) {
        incrementDirectionInstructionPosition();
      }

      let initDirectionInstruction =
        direction.points[directionInstructionPosition];

      column = column + initDirectionInstruction.x;
      row = row + initDirectionInstruction.y;

      let nextPanel: PanelObj = $panels.array.find((p) => {
        return p.column === column && p.row === row;
      });

      return nextPanel;
    };

    for (let i = 1; i < selectedArray.length * 2 - 2; i++) {
      if (isSettingDestination) {
        // Get Next Panel
        let nextPanel = getNexPanelObj();

        // Set Destination Snap Point
        let destSnapPointIndex =
          nextPanel.thisPanelsSnapPoints[
            direction.points[directionInstructionPosition].i[1]
          ];

        let destSnapPointObj = $snapPoints.array[destSnapPointIndex];

        $signalLines.setDestinationSnapPointIndex(destSnapPointObj);

        $signalLines.addSignalLine();

        // Update PrevPanel
        prevPanel = nextPanel;

        isSettingDestination = false;
      } else {
        let originSnapPointIndex =
          prevPanel.thisPanelsSnapPoints[
            direction.points[directionInstructionPosition].i[0]
          ];

        let originSnapPointObj = $snapPoints.array[originSnapPointIndex];

        $signalLines.setOriginSnapPointIndex(originSnapPointObj);

        isSettingDestination = true;
      }

      if (directionInstructionPosition % 2 == 0) {
        incrementDirectionInstructionPosition();
      }
    }
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
