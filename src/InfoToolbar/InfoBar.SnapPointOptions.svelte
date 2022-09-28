<script lang="ts">
  import { screens, currentScreenIndex } from "../store";
</script>

{#if typeof $currentScreenIndex === "number"}
  <div class="component-container">
    <div>Snap Point Quantity</div>
    <label>
      <input
        type="radio"
        bind:group={$screens[$currentScreenIndex].snapPointQuantity}
        name="snapPointsQuantity"
        value={1}
      />
      One
    </label>
    <label>
      <input
        type="radio"
        bind:group={$screens[$currentScreenIndex].snapPointQuantity}
        name="snapPointsQuantity"
        value={2}
      />
      Two
    </label>
  </div>

  <div
    class={$screens[$currentScreenIndex].snapPointQuantity == 2
      ? "twoPoints"
      : "onePoint"}
  >
    <div>Snap Point Layout</div>

    <label>
      <input
        type="radio"
        bind:group={$screens[$currentScreenIndex].snapPointDirection}
        name="snapPointDirection"
        value="horizontal"
        disabled={$screens[$currentScreenIndex].snapPointQuantity != 2}
      />
      Horizontal
    </label>
    <label>
      <input
        type="radio"
        bind:group={$screens[$currentScreenIndex].snapPointDirection}
        name="snapPointDirection"
        value="vertical"
        disabled={$screens[$currentScreenIndex].snapPointQuantity != 2}
      />
      Vertical
    </label>
  </div>
{/if}

<style>
  .component-container {
    margin-top: 5px;
  }
  .twoPoints {
    opacity: 1;
    margin-top: 10px;
  }
  .onePoint {
    opacity: 0.3;
    margin-top: 10px;
  }
</style>
