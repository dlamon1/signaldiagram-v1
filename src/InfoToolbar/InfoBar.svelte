<script lang="ts">
  import ScreenSize from "./InfoBar.ScreenSize.svelte";
  import Coordinates from "./InfoBar.Coordinates.svelte";
  import LineCounter from "./InfoBar.LineCounter.svelte";
  import Links from "./InfoBar.Links.svelte";
</script>

<div class="container">
  <div id="general">
    <ScreenSize />
  </div>

  <div class="divider" />

  <div id="general">
    <Coordinates />
  </div>

  <LineCounter />

  <div class="spacer" />

  <Links />
</div>

<style>
  .divider {
    height: 1px;
    background-color: #ccc;
    margin-top: 10px;
  }
  .spacer {
    flex: 1;
  }

  #general {
    margin-top: 0px;
  }
  .container {
    width: calc(100% - 10px);
    height: calc(100vh - 10px);
    background-color: rgb(71, 71, 71);
    color: #f7f7f7;
    font-size: 1em;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    user-select: none;
    margin: 5px;
  }
</style>
