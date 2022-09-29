<script lang="ts">
  import { onMount } from "svelte";
  import { isExportDialogOpen } from "../store";
  import { scale } from "svelte/transition";
  import FileButtons from "./ExportComponents/Export.Save.svelte";
  import ExportPNG from "./ExportComponents/Export.PNG.svelte";
  import Load from "./ExportComponents/Export.LoadFile.svelte";

  const toggleDialog = () => {
    $isExportDialogOpen = !$isExportDialogOpen;
  };
</script>

{#if $isExportDialogOpen}
  <div
    class="container"
    on:click|self={toggleDialog}
    transition:scale={{
      duration: 130,
    }}
  >
    <div class="dialog-container">
      <ExportPNG />
      <FileButtons />
      <Load />
    </div>
  </div>
{/if}

<style>
  .container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(4px);
    z-index: 2;
  }

  .dialog-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(154, 154, 154);
    border-radius: 4px;
    padding: 30px;
  }
  .title input {
    margin-top: 5px;
    width: 165px;
    font-size: 1.15em;
  }
</style>
