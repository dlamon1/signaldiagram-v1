<script lang="ts">
  import { signalDirectionButtons, width, height } from "../../store";
  import type { DirectionObj } from "../../store";

  let count = 0;

  const setSignalDirection = (direction: DirectionObj) => {
    // Find starting snap point
    let startingSnapPoint = getStartSnapPoint(direction);
    // Set signal line start
    // Get next end point
    // Set signal line end
    // Add snap point
    // Signal line start is previous end
    // Find next snap point
  };

  const getStartSnapPoint = (direction: DirectionObj) => {};

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
