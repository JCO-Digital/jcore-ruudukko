import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";
import {
  PanelBody,
  ToggleControl,
  RangeControl,
  TextControl,
} from "@wordpress/components";

import "./editor.scss";
import { generateBlockProps } from "./utils";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function edit({ attributes, setAttributes, context }) {
  const { autoSize, minSize } = attributes;

  const bps = { ...attributes.breakpoints };

  function updateBreakpoints(bp, col) {
    if (col) {
      bps[bp] = col;
    } else {
      bps[bp] = undefined;
    }
    setAttributes({ breakpoints: bps });
  }

  const breakpointsValues = [
    { label: "Small", value: "sm" },
    { label: "Medium", value: "md" },
    { label: "Large", value: "lg" },
    { label: "Extra Large", value: "xl" },
  ];

  const bpBlocks = [];
  breakpointsValues.forEach((bp) => {
    const columns = attributes.breakpoints[bp.value];
    bpBlocks.push(
      <section className="breakpoint" key={bp.value}>
        <ToggleControl
          __nextHasNoMarginBottom
          label={bp.label}
          checked={columns}
          onChange={(newValue) => updateBreakpoints(bp.value, newValue ? 2 : 0)}
        />
        {columns && (
          <RangeControl
            __nextHasNoMarginBottom
            __next40pxDefaultSize
            label="Columns"
            value={columns}
            onChange={(newColumns) => updateBreakpoints(bp.value, newColumns)}
            min={1}
            max={6}
          />
        )}
      </section>,
    );
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Settings")}>
          <ToggleControl
            __nextHasNoMarginBottom
            label={__("Auto Columns")}
            help={
              autoSize
                ? __("Set columns by size.")
                : __("Define column number by breakpoints.")
            }
            checked={autoSize}
            onChange={(newValue) => setAttributes({ autoSize: newValue })}
          />
          {autoSize && (
            <TextControl
              __nextHasNoMarginBottom
              __next40pxDefaultSize
              label="Minimum Column Width"
              placeholder="360px"
              value={minSize}
              onChange={(newValue) => setAttributes({ minSize: newValue })}
            />
          )}
          {autoSize || bpBlocks}
        </PanelBody>
      </InspectorControls>

      <div {...useBlockProps(generateBlockProps(attributes))}>
        <InnerBlocks
          orientation="horizontal"
          allowedBlocks={["jcore/column"]}
        />
      </div>
    </>
  );
}
