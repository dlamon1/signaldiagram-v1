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
    isDrawMode,
    isSelectMode,
  } from "../store";

  let oldPanelLength;
  let panelWrappersData = null;
  let init = false;

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";
  // console.log($topLevelSvgRef);

  import * as d3 from "d3";

  $: {
    let t = [$panelsClass];

    drawPanelWrappers();
  }

  const handlePanelClassUpdate = () => {
    if (!$gZoomWrapperRef) return;

    console.log(wrappers);

    // First render
    if (oldPanelLength === $panelsClass.array.length) {
      console.log("same length");
      updatePanelWrappers();
      oldPanelLength = $panelsClass.array.length;
      return;
    }
    console.log("init");

    initPanelWrappers();

    // // Length did not change, update
    // if ($panelsClass.array.length === oldPanelLength) {
    //   console.log("update");
    //   oldPanelLength = $panelsClass.array.length;

    //   updatePanelWrappers();
    //   return;
    // }

    // // Panels added
    // if ($panelsClass.array.length > oldPanelLength) {
    //   console.log("add");
    //   oldPanelLength = $panelsClass.array.length;

    //   // updatePanelWrappers();
    //   addPanelWrappers();
    //   return;
    // }

    // // Panels removed
    // if ($panelsClass.array.length < oldPanelLength) {
    //   console.log("remove");
    //   oldPanelLength = $panelsClass.array.length;

    //   removePanelWrappers();
    //   return;
    // }
  };

  let wrappers;

  const drawPanelWrappers = () => {
    let panels = $panelsClass.array;
    console.log("draw");
    init = true;
    wrappers = $gZoomWrapperRef.selectAll("rect").data(panels, (d) => d.i);

    console.log(wrappers);

    let asdf = wrappers
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", (d) => {
        return d.width;
      })
      .attr("height", (d) => d.height)
      .attr("fill", (d) => d.color.background)
      .attr("stroke", (d) => d.color.border)
      .attr("stroke-width", (d) => d.lineWidth);
    // .attr("stroke-width", function (d) {
    //   if (d.isSelected) {
    //     return d.lineWidth * 4;
    //   } else {
    //     return d.lineWidth;
    //   }
    // });

    let sele = wrappers
      .filter(function (d) {
        return d.isSelected;
      })
      .attr("x", (d) => d.x + d.lineWidth)
      .attr("y", (d) => d.y + d.lineWidth)
      .attr("width", (d) => {
        return d.width - d.lineWidth * 2;
      })
      .attr("height", (d) => d.height - d.lineWidth * 2)
      .attr("stroke", selectedColor)
      .attr("stroke-width", (d) => d.lineWidth * 2);

    console.log(sele);

    wrappers
      .exit()
      // .selectAll("rect")
      // .transition()
      // .duration(50)
      .attr("height", (d) => {
        console.log("exit ", d.x, d.y, d.width, d.height);
        return 0;
      })
      .attr("height", 0)
      .attr("fill", "transparent")
      .remove();

    wrappers
      .enter()
      // add a debug rectange
      // .append("svg")
      .append("rect")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      // .attr("width", (d) => d.width)
      // .attr("height", (d) => d.height)
      .attr("id", (d) => {
        console.log("enter ", d.x, d.y, d.width, d.height);
        return "panel-rectangle" + d.i;
      })
      // .attr("x", (d) => d.x)
      // .attr("y", (d) => d.y)

      .attr("width", (d) => {
        return d.width;
      })
      .attr("height", (d) => d.height)
      .attr("fill", (d) => {
        console.log(d.color.background);
        return d.color.background;
      })
      .attr("stroke", (d) => d.color.border)
      .attr("stroke-width", (d) => d.lineWidth)
      .style("point-events", $isDrawingSignalLine && "none")
      .on("mouseover", function (d, i) {
        if ($isDrawMode) {
          return;
        }
        d3.select(this).attr("fill", hoveredColor);
      })
      .on("mouseout", function (d, i) {
        if ($isDrawMode) return;
        let obj = d.path[0].__data__;
        d3.select(this).attr("fill", obj.color.background);
      })
      .on("mousemove", function (d) {
        if (!$isDrawMode) return;
        $signalLinesClass.nullDestinationSnapPointIndex();
        $signalLinesClass.setMousePosition(d);
      })
      .on("mouseup", function (d) {
        $signalLinesClass.nullDestinationSnapPointIndex();
        $signalLinesClass.nullDestinationSnapPointIndex();
        $signalLinesClass.setMousePosition({ x: 0, y: 0 });

        d3.select("#temp-signal-line")
          .attr("x1", null)
          .attr("y1", null)
          .attr("x2", null)
          .attr("y2", null);

        // setIsDrawingSignalLine(false);
      })
      .on("click", function (d, i, n) {
        // console.log(d.srcElement.__data__);
        if ($isDrawMode) return;
        // d.srcElement.__data__.toggleIsSelected();
        d.stopPropagation();
        $isSelectMode && !$isDrawingSignalLine && $panelsClass.selectPanel(d);
      });

    // .filter(function (d) {
    //   // console.log(d);
    //   // if (d.i === 0) console.log(d);
    //   if (d.isSelected) console.log(d);
    //   return d.isSelected;
    // })
    // .attr("stroke", selectedColor)
    // .attr("stroke-width", (d) => d.lineWidth * 4);

    // wrappers
    //   .selectAll("rect")

    // .transition()
    // .duration(1000)
    // .delay(10)
    // .attr("x", (d) => d.x)
    // .attr("y", (d) => d.y)
    // .attr("width", (d) => d.width)
    // .attr("height", (d) => d.height);
  };

  const updatePanelWrappers = () => {
    panelWrappersData
      .data($panelsClass.array)
      .transition()
      .attr("fill", (d) => d.color.background)
      .attr("stroke", (d) => d.color.border);

    // .attr("id", (d) => "panel-group" + d.i)
    // .attr("x", (d) => d.x)
    // .attr("y", (d) => d.y)
    // .attr("width", (d) => d.width)
    // .attr("height", (d) => d.height)
    // .style("point-events", $isDrawingSignalLine && "none");
    // console.log($panelWrappersRef);
  };

  const addPanelWrappers = () => {
    wrappers = $gZoomWrapperRef.selectAll("svg").data($panelsClass.array);

    wrappers
      .exit()
      .transition()
      // .duration(0)
      .attr("width", (d) => {
        console.log(d);
        return 0;
      })
      .attr("height", 0)
      .remove();
  };

  const removePanelWrappers = () => {
    wrappers = $gZoomWrapperRef.selectAll("svg").data($panelsClass.array);

    wrappers
      .exit()
      .transition()
      // .duration(0)
      .attr("width", (d) => {
        console.log(d);
        return 0;
      })
      .attr("height", 0)
      .remove();
  };
</script>
