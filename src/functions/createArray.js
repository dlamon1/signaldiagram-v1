export const createArray = (
  dimensions,
  rows,
  columns,
  canvasWidth,
  canvasHeight,
  colors,
  ratio,
  toolbarWidth,
  panels
) => {
  let array = [];

  let count = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let colorIndex = 0;
      let backgroundColor = colorIndex == 0 ? colors.one : colors.two;

      if ((i + j) % 2 === 1) {
        colorIndex = 1;
      }

      if (panels[count]) {
        backgroundColor = panels[count].backgroundColor;
      }

      array.push({
        i: count,
        row: i,
        column: j,
        colorIndex: colorIndex,
        isSelected: false,
        width: dimensions.panelDimension * ratio,
        height: dimensions.panelDimension,
        x: dimensions.panelDimension * j * ratio + dimensions.leftPadding,
        y: dimensions.panelDimension * i + dimensions.topPadding,
        color: colorIndex == 0 ? colors.one : colors.two,
        lineWidth: 1,
        backgroundColor: backgroundColor,
        borderColor: "#000000",
        showCoordinates: true,
        isRearView: false,
      });

      count++;
    }
  }

  return array;
};
