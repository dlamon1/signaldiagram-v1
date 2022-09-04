<script lang="ts">
  import { signalDirectionButtons, width, height, panels } from "../../store";
  import type { DirectionObj } from "../../store";
  import type { PanelObj } from "../../Types/ClassTypes";

  let count = 0;
  let selectedArray: PanelObj[] = [];

  const setSignalDirection = (direction: DirectionObj) => {
    selectedArray = [];

    $panels.array.forEach((p) => {
      if (p.isSelected) {
        selectedArray.push(p);
      }
    });

    if (!selectedArray.length) {
      return;
    }

    // Find starting snap point

    let startingSnapPoint = getStartSnapPoint(direction);

    const setCornerPanelIndexes = (arrayOfPanels: PanelObj[]) => {
      console.log(arrayOfPanels[0].i);
      let cornerPanelIndexes = {
        topLeft: arrayOfPanels[0].i,
        topRight: arrayOfPanels[0].i,
        bottomLeft: arrayOfPanels[0].i,
        bottomRight: arrayOfPanels[0].i,
      };

      arrayOfPanels.forEach((p) => {
        if (
          p.x <= $panels.array[cornerPanelIndexes.topLeft].x &&
          p.y <= $panels.array[cornerPanelIndexes.topLeft].y
        ) {
          cornerPanelIndexes.topLeft = p.i;
        }
        if (
          p.x >= $panels.array[cornerPanelIndexes.topRight].x &&
          p.y <= $panels.array[cornerPanelIndexes.topRight].y
        ) {
          cornerPanelIndexes.topRight = p.i;
        }
        if (
          p.x <= $panels.array[cornerPanelIndexes.bottomLeft].x &&
          p.y >= $panels.array[cornerPanelIndexes.bottomLeft].y
        ) {
          cornerPanelIndexes.bottomLeft = p.i;
        }
        if (
          p.x >= $panels.array[cornerPanelIndexes.bottomRight].x &&
          p.y >= $panels.array[cornerPanelIndexes.bottomRight].y
        ) {
          cornerPanelIndexes.bottomRight = p.i;
        }
      });

      return cornerPanelIndexes;
    };

    let cornerPanelIndexes = setCornerPanelIndexes(selectedArray);

    console.log(cornerPanelIndexes);

    // Set signal line start
    // Get next end point
    // Set signal line end
    // Add snap point
    // Signal line start is previous end
    // Find next snap point
  };

  const getStartSnapPoint = (direction: DirectionObj) => {
    // console.log(direction);
    return;
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
