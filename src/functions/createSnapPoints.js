export const createSnapPoints = (
  dimensions,
  innerWidth,
  innerHeight,
  rows,
  columns,
  width,
  height,
  toolbarWidth,
  snapPointsQuantity,
  snapPointDirection,
  ratio,
  squares
) => {
  let pointArray = [];
  let squareArray = [];
  let circleArray = [];

  let index = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      for (let k = 1; k < snapPointsQuantity + 1; k++) {
        let x;
        let y;
        let isOn = false;
        let label = "A1";
        let backgroundColor = "#ffffff";
        let fontColor = "#000000";
        let outlineColor = "#000000";

        if (squares[index]) {
          isOn = squares[index].isOn;
          label = squares[index].label;
          backgroundColor = squares[index].backgroundColor;
          fontColor = squares[index].fontColor;
          outlineColor = squares[index].outlineColor;
        }

        let radius =
          dimensions.panelDimension * ratio < dimensions.panelDimension
            ? (dimensions.panelDimension * ratio) / 15
            : dimensions.panelDimension / 15;

        let panelx =
          dimensions.panelDimension * j * ratio + dimensions.leftPadding;
        let panely = dimensions.panelDimension * i + dimensions.topPadding;

        if (snapPointDirection === "horizontal") {
          x = panelx + ((dimensions.panelDimension * ratio) / 3) * k;
          y = panely + dimensions.panelDimension / 2;
        } else {
          x = panelx + (dimensions.panelDimension * ratio) / 2;
          y = panely + (dimensions.panelDimension / 3) * k;
        }

        if (snapPointsQuantity === 1) {
          x = panelx + (dimensions.panelDimension * ratio) / 2;
          y = panely + dimensions.panelDimension / 2;
        }

        let point = {
          i: index,
          x: x,
          y: y,
          radius,
          panelWidth: dimensions.panelDimension * ratio,
          panelHeight: dimensions.panelDimension,
          hasSquare: isOn,
          hasCircle: false,
          hasTriangle: false,
          label: "a1",
          backgroundColor: "#ffffff",
          fontColor: "#000000",
          outlineColor: "#000000",
        };

        let square = {
          isOn,
          i: index,
          x: x,
          y: y,
          width: radius * 6,
          label,
          backgroundColor,
          fontColor,
          outlineColor,
        };

        let circle = {
          isOn: false,
          i: index,
          x: x,
          y: y,
          radius,
          panelWidth: dimensions.panelDimension * ratio,
          panelHeight: dimensions.panelDimension,
          hasSquare: false,
          hasCircle: false,
          hasTriangle: false,
          label: "a1",
          backgroundColor: "#ffffff",
          fontColor: "#000000",
          outlineColor: "#000000",
        };

        pointArray.push(point);
        squareArray.push(square);
        circleArray.push(circle);

        index++;
      }
    }
  }
  return { pointArray, squareArray, circleArray };
};
