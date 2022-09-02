<script lang="ts">
  import Mode from "./Toolbar.Mode.svelte";
  import ScreenSize from "./Toolbar.ScreenSize.svelte";
  import Panels from "./Toolbar.Panels.svelte";
  import SnapPoints from "./Toolbar.SnapPoints.svelte";
  import SignalLines from "./Toolbar.SignalLines.svelte";
  import Coordinates from "./Toolbar.Coordinates.svelte";
  import SnapPointOptions from "./Toolbar.SnapPointOptions.svelte";
  import LineCounter from "./Toolbar.LineCounter.svelte";
  import Links from "./Toolbar.Links.svelte";

  import { selection } from "../store";
</script>

<div id="container">
  <div id="mode">
    <Mode />
  </div>

  <div class="divider" />

  <div id="general">
    <ScreenSize />
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

  <LineCounter />

  <Links />
</div>

<style>
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

  .divider {
    height: 1px;
    background-color: #ccc;
    margin-top: 10px;
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
