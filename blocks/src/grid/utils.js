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
    Object.keys(attributes.breakpoints).forEach((bp) => {
      const value = attributes.breakpoints[bp];
      console.debug(bp, value);
      classList.push(`columns-${bp}-${value}`);
    });
  }
  if (attributes.minSize) {
    style["--jcore-column-min"] = attributes.minSize;
  }
  return { className: classList.join(" "), style };
}
