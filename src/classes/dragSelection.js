export class DragSelection {
  constructor() {
    this.origin = { x: null, y: null, i: null };
    this.end = { x: null, y: null, i: null };
    this.isSelected = false;
    this.isHovered = false;
    this.i = null;
    this.num = 0;
    this.isDragging = false;
  }

  setOrigin(e) {
    this.origin.x = e.offsetX;
    this.origin.y = e.offsetY;
  }

  setEnd(x, y, i) {
    this.end.x = x;
    this.end.y = y;
    this.end.i = i;
  }

  setIsSelected(isSelected) {
    this.isSelected = isSelected;
  }

  setIsHovered(isHovered) {
    this.isHovered = isHovered;
  }

  setI(i) {
    this.i = i;
  }
}
