<script>
  import { onMount } from "svelte";

  import * as d3 from "d3";

  import {
    signalLines as signalLinesClass,
    snapPoints as snapPointsClass,
    panels as panelsClass,
    panelWrappersRef,
    isSelectMode,
    isDrawMode,
    setIsDrawingSignalLine,
    isDrawingSignalLine,
    selectedPanelRectsRef,
    snapPointsWrapper,
    snapPointBaseCircles,
    selectedSnapPointCirclesRef,
  } from "../store";

  let hoveredColor = "rgba(0, 255, 170, 1)";
  let selectedColor = "rgba(241, 89, 70, 1)";

  $: {
    console.log("triggered");

    $snapPointsWrapper && asdf();
  }

  const asdf = () => {
    let snapPoints = $snapPointsClass.array;
    $selectedSnapPointCirclesRef?.remove();

    $snapPointBaseCircles = $snapPointsWrapper
      .selectAll("circle")
      .data(function (d, i, n) {
        let data = [];

        snapPoints.forEach((sp) => {
          if (
            sp.pointIndexFullArray == d.thisPanelsSnapPoints[0] ||
            sp.pointIndexFullArray == d.thisPanelsSnapPoints[1]
          ) {
            data.push(sp);
          }
        });

        return data;
      })
      .enter()
      .append("circle")
      .attr("id", (d, i) => "snap-point-circle" + i)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => ($isDrawMode ? d.radius * 2 : d.radius))
      .style("point-events", $isDrawingSignalLine && "none")
      .attr("fill", (d) => d.color.background)
      .style("paint-order", "stroke")
      .attr("stroke-alignment", "inner")
      .attr("stroke", (d) => d.color.border)
      .attr("stroke-width", 2)
      .on("mouseover", function (d, i) {
        if ($isDrawingSignalLine) {
          $signalLinesClass.setDestinationSnapPointIndex(d);
        }
        d.stopPropagation();
        let obj = d.path[0].__data__;
        d3.select(this).attr("fill", hoveredColor);
        // .attr("stroke-width", obj.lineWidth * 4);
      })
      .on("mouseout", function (d, i) {
        d.stopPropagation();
        let obj = d.path[0].__data__;
        d3.select(this).attr("fill", obj.color.background);
        // .attr("stroke-width", obj.lineWidth);
      })

      .on("mousedown", function (d, i) {
        d.stopPropagation();
        if (!$isDrawMode) return;

        console.log("drawing from mousedown");
        $signalLinesClass.setOriginSnapPointIndex(d);
        setIsDrawingSignalLine(true);
      })
      .on("mouseup", (d) => {
        d.stopPropagation();
        // setIsDrawingSignalLine(false);
        if ($isDrawMode && $isDrawingSignalLine) {
          $signalLinesClass.addSignalLine();
          setIsDrawingSignalLine(false);
        }
      })
      .on("click", (e) => {
        e.stopPropagation();
        if (!$isDrawMode) {
          $snapPointsClass.selectSnapPoint(e);
        }
      });

    $selectedSnapPointCirclesRef = $snapPointsWrapper
      .selectAll("circle")
      .filter(function (d) {
        // d.isSelected && console.log(d);
        return d.isSelected;
      })
      // .transition()
      .attr("stroke", selectedColor)
      .attr("stroke-width", (d) => d.strokeWidth * 4);
  };
</script>
