import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";

import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function edit({ attributes, setAttributes, context }) {
  const { columns, blockType } = attributes;

  const cols = [];
  for (let i = 0; i < columns; i++) {
    cols.push(
      <div key={i} className="column">
        <InnerBlocks />
      </div>,
    );
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Settings", "jcore")}>
          <RangeControl
            __nextHasNoMarginBottom
            __next40pxDefaultSize
            label="Columns"
            value={columns}
            onChange={(newValue) =>
              setAttributes({ columns: Number(newValue) })
            }
            min={1}
            max={6}
          />
        </PanelBody>
      </InspectorControls>

      <div
        {...useBlockProps({
          className: "columns-" + columns + " blocktype-" + blockType,
        })}
      >
        <InnerBlocks
          orientation="horizontal"
          allowedBlocks={["jcore/column"]}
        />
      </div>
    </>
  );
}
