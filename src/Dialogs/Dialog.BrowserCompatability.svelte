<script>
  import { isChrome } from "../store";
  let isOpen = true;

  const closeDialog = () => {
    isOpen = false;
  };
</script>

{#if isOpen && !$isChrome}
  <div class="container" on:click|self={closeDialog}>
    <div class="dialog-container">
      <div>This website only works in Chrome.</div>
      <div class="close">Click to close</div>
    </div>
  </div>
{/if}

<style>
  .close {
    margin-top: 10px;
    font-size: 0.8em;
  }
  .container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(6px);
    z-index: 2;
    cursor: pointer;
  }

  .dialog-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(95, 95, 95);
    border-radius: 4px;
    padding: 30px;
    color: white;
    font-size: 1.5em;
    pointer-events: none;
    border: 2px solid rgb(218, 255, 236);
  }
</style>
