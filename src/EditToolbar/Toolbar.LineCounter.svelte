<script lang="ts">
  import {
    signalLines,
    distanceUnit,
    snapPointDirection,
    widthMM,
    heightMM,
    isRearView,
  } from "../store";

  import type { SignalLineObj } from "../Types/ClassTypes";

  type Length = {
    length: number;
    quantity: number;
  };

  let topTopCounts: Length[] = [];
  let topBottomCounts = [];
  let bottomBottomCounts = [];

  $: {
    let t = [$signalLines.array, $widthMM, $heightMM, $isRearView];

    let signalLineTotals = setCalculations();

    let ttCounts = calculateTotals(signalLineTotals.topTop);

    for (const l in ttCounts) {
      let obj: Length = { length: parseInt(l), quantity: ttCounts[l] };
      topTopCounts.push(obj);
    }

    let tbCounts = calculateTotals(signalLineTotals.topBottom);

    for (const l in tbCounts) {
      let obj: Length = { length: parseInt(l), quantity: tbCounts[l] };
      topBottomCounts.push(obj);
    }

    let bbCounts = calculateTotals(signalLineTotals.bottomBottom);

    for (const l in bbCounts) {
      let obj: Length = { length: parseInt(l), quantity: bbCounts[l] };
      bottomBottomCounts.push(obj);
    }
  }

  const setCalculations = () => {
    topTopCounts = [];
    topBottomCounts = [];
    bottomBottomCounts = [];

    let totals = {
      topTop: [],
      topBottom: [],
      bottomBottom: [],
    };

    $signalLines.array.forEach((sl: SignalLineObj) => {
      let originIndex = sl.origin.pointIndexWithinPanel;
      let destinationIndex = sl.destination.pointIndexWithinPanel;

      if (originIndex == 1 && destinationIndex == 1) {
        totals.topTop.push(sl.getLengthInMM());
      } else if (originIndex == 1 && destinationIndex == 2) {
        totals.topBottom.push(sl.getLengthInMM());
      } else if (originIndex == 2 && destinationIndex == 1) {
        totals.topBottom.push(sl.getLengthInMM());
      } else if (originIndex == 2 && destinationIndex == 2) {
        totals.bottomBottom.push(sl.getLengthInMM());
      }
    });

    return totals;
  };

  const calculateTotals = (a: number[]) => {
    const map = a.reduce(
      (cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt),
      {}
    );
    return map;
  };
</script>

<div class="component-container">
  <div class="category-container">
    <div class="category-header">
      {$snapPointDirection == "vertical" ? "Top:Top" : "Left:Left"}
    </div>
    <div class="table-header">
      <div class="table-row">
        <div>Length</div>
        <div>Quantity</div>
      </div>

      {#each topTopCounts as length}
        <div class="table-row">
          <div>{length.length}{$distanceUnit}</div>
          <div>{length.quantity}</div>
        </div>
      {/each}
    </div>
  </div>

  <div class="category-container">
    <div class="category-header">
      {$snapPointDirection == "vertical" ? "Top:Bottom" : "Left:Right"}
    </div>
    <div class="table-header">
      <div class="table-row">
        <div>Length</div>
        <div>Quantity</div>
      </div>

      {#each topBottomCounts as length}
        <div class="table-row">
          <div>
            {length.length}{$distanceUnit}
          </div>
          <div>
            {length.quantity}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="category-container">
    <div class="category-header">
      {$snapPointDirection == "vertical" ? "Bottom:Bottom" : "Right:Right"}
    </div>
    <div class="table-header">
      <div class="table-row">
        <div>Length</div>
        <div>Quantity</div>
      </div>

      {#each bottomBottomCounts as length}
        <div class="table-row">
          <div>{length.length}{$distanceUnit}:</div>
          <div>
            {length.quantity}
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div class="spacer" />
</div>

<style>
  .component-container {
    margin-inline: 40px;
  }
  .category-header {
    font-weight: bold;
    font-size: 1.1em;
    text-align: center;
  }
  .category-container {
    margin-top: 1em;
  }
  .table-row {
    display: grid;
    grid-template-columns: 65% 35%;
  }
  .spacer {
    height: 15px;
  }
</style>
