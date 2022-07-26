<script>
  import Panels from "./Panels.svelte";
  import EventHandlers from "./EventHandlers.svelte";
  import EditToolbar from "./EditToolbar.svelte";
  import Mode from "./Mode.svelte";
  import CanvasDraw from "./CanvasDraw.svelte";
  import Dialogs from "./Dialogs/index.svelte";

  import { canvasWidth, canvasHeight } from "./store";
</script>

<div id="container">
  <Mode />
  <Panels />
  <EditToolbar />
  <EventHandlers />
  <CanvasDraw />
  <Dialogs />
</div>

<style>
  #container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: rgb(37, 37, 37);
  }
</style>
