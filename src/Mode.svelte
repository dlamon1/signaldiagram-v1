<script>
  import { mode, isDrawMode, isSelectMode } from "./store";

  //console.log("mode render");

  $: {
    //console.log("mode changed");
    $isDrawMode = false;
    $isSelectMode = false;

    if ($mode === "draw") {
      $isDrawMode = true;
    } else if ($mode === "select") {
      $isSelectMode = true;
    }
  }
</script>
