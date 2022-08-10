<script>
  import {
    title,
    columns,
    rows,
    width,
    height,
    showCoordinates,
    isRearView,
    snapPointsQuantity,
    snapPointDirection,
  } from "../store";
</script>

<div id="general">
  <div id="dimensions-container">
    <div id="input-wrapper">
      Columns:
      <input type="number" bind:value={$columns} min="1" />
    </div>

    <div id="input-wrapper">
      Rows:
      <input type="number" bind:value={$rows} min="1" />
    </div>

    <div id="input-wrapper">
      Width:
      <input type="number" bind:value={$width} min="1" />
    </div>

    <div id="input-wrapper">
      Height:
      <input type="number" bind:value={$height} min="1" />
    </div>
  </div>
</div>

<style>
  #dimensions-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 10px;
  }

  #dimensions-container input {
    width: 100px;
  }
</style>
