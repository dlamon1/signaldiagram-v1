<script>
  import Mode from "./EditToolbar/Toolbar.Mode.svelte";
  import General from "./EditToolbar/Toolbar.General.svelte";
  import Panels from "./EditToolbar/Toolbar.Panels.svelte";
  import SnapPoints from "./EditToolbar/Toolbar.SnapPoints.svelte";
  import SignalLines from "./EditToolbar/Toolbar.SignalLines.svelte";
  import Coordinates from "./EditToolbar/Toolbar.Coordinates.svelte";
  import SnapPointOptions from "./EditToolbar/Toolbar.SnapPointOptions.svelte";

  import { tooltip } from "./Tooltips/tooltip.js";

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

  <div class="link-wrapper">
    <a
      title="Thank you for the help!"
      use:tooltip
      href="https://github.com/dlamon1/signaldiagram/issues"
      target="_blank"
    >
      Report a Bug</a
    >
  </div>

  <div class="link-wrapper">
    <a href="mailto: support@leadled.io">Feedback</a>
  </div>

  <div class="link-wrapper">
    <a
      class="version"
      title="Click here for Version 1.0.0"
      use:tooltip
      href="https://v1.signaldiagram.com"
    >
      Version 2.0.0</a
    >
  </div>
</div>

<style>
  .version {
    margin-top: 10px;
    align-self: center;
    color: aqua;
  }
  .selected {
    color: #fff;
    background-color: #000;
    padding: 5px;
    /* font-weight: bold; */
    transition: all 0.33s ease-in-out;
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
  .link-wrapper {
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
