export function generateGridProps(attributes) {
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
      classList.push(`columns-${bp}-${value}`);
    });
  }
  if (attributes.minSize) {
    style["--jcore-column-min"] = attributes.minSize;
  }
  return { className: classList.join(" "), style };
}

export function generateColumnProps(attributes) {
  let classList = [];
  let style = {};
  if (attributes.useBreakpoints) {
    Object.keys(attributes.breakpoints).forEach((bp) => {
      const value = attributes.breakpoints[bp];
      classList.push(`span-${bp}-${value}`);
    });
  } else {
    if (attributes.span > 1) {
      classList.push(`span-${attributes.span}`);
    }
  }
  return { className: classList.join(" "), style };
}
