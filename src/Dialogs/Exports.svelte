<script>
  import { isExportDialogOpen, toolbarWidth } from "../store";
  import { scale } from "svelte/transition";
  import FileButtons from "../EditToolbar/File.svelte";

  const toggleDialog = () => {
    $isExportDialogOpen = !$isExportDialogOpen;
  };
  $: console.log($isExportDialogOpen);
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
      <FileButtons />
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
</style>
