<script lang="ts">
  import { snapPointsQuantity, snapPointDirection } from "../store";
</script>

<div class="component-container">
  <div>Snap Point Quantity</div>
  <label>
    <input
      type="radio"
      bind:group={$snapPointsQuantity}
      name="snapPointsQuantity"
      value={1}
    />
    One
  </label>
  <label>
    <input
      type="radio"
      bind:group={$snapPointsQuantity}
      name="snapPointsQuantity"
      value={2}
    />
    Two
  </label>
</div>

<div class={$snapPointsQuantity == 2 ? "twoPoints" : "onePoint"}>
  <div>Snap Point Layout</div>

  <label>
    <input
      type="radio"
      bind:group={$snapPointDirection}
      name="snapPointDirection"
      value="horizontal"
      disabled={$snapPointsQuantity != 2}
    />
    Horizontal
  </label>
  <label>
    <input
      type="radio"
      bind:group={$snapPointDirection}
      name="snapPointDirection"
      value="vertical"
      disabled={$snapPointsQuantity != 2}
    />
    Vertical
  </label>
</div>

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
