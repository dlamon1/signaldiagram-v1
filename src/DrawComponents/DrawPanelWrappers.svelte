<script>
  import {
    signalLines as signalLinesClass,
    snapPoints as snapPointsClass,
    panels as panelsClass,
    svgRef,
    isDrawingSignalLine,
    gZoomWrapperRef,
    panelWrappersRef,
    mode,
    topLevelSvgRef,
  } from "../store";

  let oldPanelLength = 0;
  let panelWrappersData = null;

  // console.log($topLevelSvgRef);

  $: {
    let t = [$panelsClass];

    handlePanelClassUpdate();
  }

  const handlePanelClassUpdate = () => {
    if (!$gZoomWrapperRef) return;

    // First render
    if (!$panelWrappersRef) {
      console.log("init");
      oldPanelLength = $panelsClass.array.length;
      initPanelWrappers();
      return;
    }

    // Length did not change, update
    if ($panelsClass.array.length === oldPanelLength) {
      console.log("update");
      oldPanelLength = $panelsClass.array.length;

      updatePanelWrappers();
      return;
    }

    // Panels added
    if ($panelsClass.array.length > oldPanelLength) {
      console.log("add");
      oldPanelLength = $panelsClass.array.length;

      updatePanelWrappers();
      // addPanelWrappers();
      return;
    }

    // Panels removed
    if ($panelsClass.array.length < oldPanelLength) {
      console.log("remove");
      oldPanelLength = $panelsClass.array.length;

      removePanelWrappers();
      return;
    }
  };

  const initPanelWrappers = () => {
    panelWrappersData = $gZoomWrapperRef
      .selectAll("svg")
      .data($panelsClass.array);

    $panelWrappersRef = panelWrappersData
      .enter()
      .append("svg")
      .attr("id", (d) => "panel-group" + d.i)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .style("point-events", $isDrawingSignalLine && "none");
  };

  const updatePanelWrappers = () => {
    $panelWrappersRef = panelWrappersData
      .data($panelsClass.array)
      // .transition()
      .attr("id", (d) => "panel-group" + d.i)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .style("point-events", $isDrawingSignalLine && "none");
    console.log($panelWrappersRef);
  };

  const addPanelWrappers = () => {
    $panelWrappersRef = panelWrappersData.data($panelsClass.array).enter();
    // .attr("id", (d) => "panel-group" + d.i)
    // .attr("x", (d) => d.x)
    // .attr("y", (d) => d.y)
    // .attr("width", (d) => d.width)
    // .attr("height", (d) => d.height)
    // .style("point-events", $isDrawingSignalLine && "none");
  };

  const removePanelWrappers = () => {
    $panelWrappersRef;
  };
</script>
