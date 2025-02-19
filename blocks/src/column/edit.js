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
export default function Edit({ attributes, setAttributes, context }) {
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Settings", "jcore")}></PanelBody>
      </InspectorControls>

      <div {...useBlockProps()}>
        <InnerBlocks />
      </div>
    </>
  );
}
