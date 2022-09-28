<script lang="ts">
</script>

<div id="general">
  <div id="dimensions-container">
    <!-- <div id="input-wrapper">
      Columns:
      <input type="number" bind:value={$columns} min="1" />
    </div>

    <div id="input-wrapper">
      Rows:
      <input type="number" bind:value={$rows} min="1" />
    </div> -->

    <!-- <div id="input-wrapper">
      Width(px):
      <input type="number" bind:value={$width} min="1" />
    </div>

    <div id="input-wrapper">
      Height(px):
      <input type="number" bind:value={$height} min="1" />
    </div>

    <div id="input-wrapper">
      Width(mm):
      <input type="number" bind:value={$widthMM} min="1" />
    </div>

    <div id="input-wrapper">
      Height(mm):
      <input type="number" bind:value={$heightMM} min="1" />
    </div> -->
  </div>
</div>

<style>
  #dimensions-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 5px;
  }

  #dimensions-container input {
    width: 100px;
  }
</style>
