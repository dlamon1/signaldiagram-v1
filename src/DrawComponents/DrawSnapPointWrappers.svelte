<script>
  import { onMount } from "svelte";

  import {
    signalLines as signalLinesClass,
    snapPoints as snapPointsClass,
    panels as panelsClass,
    panelWrappersRef,
    snapPointsWrapper,
  } from "../store";

  $: {
    let t = [$snapPointsClass];

    console.log("triggered");

    $panelWrappersRef && initSnapPointGroups();
  }

  export const initSnapPointGroups = () => {
    $snapPointsWrapper?.select("*").remove();

    // Draw a G for each Snap Point
    $snapPointsWrapper = $panelWrappersRef
      .append("g")
      .attr("id", (d) => "snap-point-group" + d.i);
  };
</script>
