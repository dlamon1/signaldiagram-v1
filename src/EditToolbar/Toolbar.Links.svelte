<script lang="ts">
  import { tooltip } from "../Tooltips/tooltip";

  import { isExportDialogOpen } from "../store";
</script>

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
    Version 2.1.0</a
  >
</div>

<style>
  .version {
    margin-top: 10px;
    align-self: center;
    color: aqua;
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
</style>
