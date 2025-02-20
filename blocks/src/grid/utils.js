export function generateBlockProps(attributes) {
  let classList = [];
  let style = {};
  switch (attributes.blockType) {
    case "grid":
      classList.push("jgrid");
      break;
    case "flex":
      classList.push("jflex");
      break;
  }
  if (!attributes.autoSize) {
    classList.push(`columns-${attributes.columns}`);
  }
  if (attributes.minSize) {
    style["--jcore-column-min"] = attributes.minSize;
  }
  return { className: classList.join(" "), style };
}
