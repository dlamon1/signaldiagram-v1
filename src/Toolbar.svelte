<script>
  import Mode from "./EditToolbar/Mode.svelte";
  import General from ".//EditToolbar/General.svelte";
  import Panels from "./EditToolbar/Panels.svelte";
  import SnapPoints from "./EditToolbar/SnapPoints.svelte";
  import SignalLines from "./EditToolbar/SignalLines.svelte";
  import File from "./EditToolbar/File.svelte";
  import Coordinates from "./EditToolbar/Coordinates.svelte";
  import SnapPointOptions from "./EditToolbar/SnapPointOptions.svelte";

  import { isExportDialogOpen, selection } from "./store";
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

  <div class="title-container">
    <div
      class="title"
      on:click={() => ($selection = "panels")}
      class:selected={$selection === "panels"}
    >
      Panels
    </div>
    <div
      class="title"
      on:click={() => ($selection = "snappoints")}
      class:selected={$selection === "snappoints"}
    >
      Snap Points
    </div>
    <div
      class="title"
      on:click={() => ($selection = "signallines")}
      class:selected={$selection === "signallines"}
    >
      Signal Lines
    </div>
  </div>

  <div id="selectors">
    {#if $selection === "panels"}
      <Panels />
    {/if}

    {#if $selection === "snappoints"}
      <SnapPoints />
    {/if}

    {#if $selection === "signallines"}
      <SignalLines />
    {/if}
  </div>

  <button class="dialog" on:click={() => ($isExportDialogOpen = true)}
    >Import / Export</button
  >

  <div class="email">
    <a href="mailto: support@leadled.io">Feedback</a>
  </div>
</div>

<style>
  .selected {
    color: #fff;
    background-color: #000;
    padding: 5px;
    font-weight: bold;
    transition: all 0.1s ease-in-out;
  }
  .title-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* margin-bottom: 10px; */
  }
  .title {
    padding: 5px;
  }
  .title:hover {
    outline: 1px solid #000;
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

  #selectors {
    position: relative;
    flex: 1;
  }
</style>
