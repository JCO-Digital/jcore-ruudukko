import { __, sprintf } from "@wordpress/i18n";

const variations = [
  {
    name: "jcore-grid",
    title: "Jcore Grid",
    icon: "grid-view",
    description: __("Grid."),
    attributes: { blockType: "grid" },
    isActive: ["blockType"],
    isDefault: true,
    scope: ["inserter", "transform"],
  },
  {
    name: "jcore-flex",
    title: "Jcore Flex Columns",
    icon: "columns",
    description: __("Flex Columns."),
    attributes: { blockType: "flex" },
    isActive: ["blockType"],
    scope: ["inserter", "transform"],
  },
];

export default variations;
