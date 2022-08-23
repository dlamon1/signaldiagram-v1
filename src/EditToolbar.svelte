<script>
  import Mode from "./EditToolbar/Mode.svelte";
  import General from ".//EditToolbar/General.svelte";
  import Panels from "./EditToolbar/Panels.svelte";
  import SnapPoints from "./EditToolbar/SnapPoints.svelte";
  import SignalLines from "./EditToolbar/SignalLines.svelte";
  import File from "./EditToolbar/File.svelte";
  import Coordinates from "./EditToolbar/Coordinates.svelte";
  import SnapPointOptions from "./EditToolbar/SnapPointOptions.svelte";

  import { selectionTab, isExportDialogOpen } from "./store";
</script>

<div id="container">
  <div id="mode">
    <Mode />
  </div>

  <div class="divider" />

  <div id="general">
    <General />
  </div>

  <div class="divider" />

  <div id="general">
    <Coordinates />
  </div>

  <div class="divider" />

  <div id="general">
    <SnapPointOptions />
  </div>

  <div class="divider" />

  <div id="selectors">
    {#if $selectionTab === "panels"}
      <Panels />
    {/if}

    {#if $selectionTab === "squares"}
      <SnapPoints />
    {/if}

    {#if $selectionTab === "lines"}
      <SignalLines />
    {/if}
  </div>

  <a href="https://svg.signaldiagram.com" class="version">v2.0.0 Beta</a>

  <button class="dialog" on:click={() => ($isExportDialogOpen = true)}
    >Import / Export</button
  >

  <div class="email">
    <a href="mailto: support@leadled.io">Feedback</a>
  </div>
</div>

<style>
  .version {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    padding: 10px;
    background-color: rgb(62, 115, 176);
  }
  .dialog {
    height: 40px;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
  .email {
    margin-top: 10px;
    align-self: center;
  }
  .divider {
    height: 1px;
    background-color: #ccc;
    margin: 10px 0;
  }
  #mode {
    margin-top: 0px;
  }
  #general {
    margin-top: 0px;
  }
  #container {
    position: fixed;
    width: 250px;
    height: calc(99.5vh - 10px);
    right: 0;
    background-color: rgb(71, 71, 71);
    color: #f7f7f7;
    font-size: 1em;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    user-select: none;
    padding: 5px;
  }

  #selectors {
    position: relative;
    flex: 1;
  }
</style>
