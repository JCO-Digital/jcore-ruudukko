import { __ } from "@wordpress/i18n";
import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import { generateColumnProps } from "../utils";
import { breakpointsValues } from "../constants";

import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const { useBreakpoints, span } = attributes;

  const bps = { ...attributes.breakpoints };

  function updateBreakpoints(bp, col) {
    if (col) {
      bps[bp] = col;
    } else {
      bps[bp] = undefined;
    }
    setAttributes({ breakpoints: bps });
  }

  const bpBlocks = [];
  breakpointsValues.forEach((bp) => {
    const span = attributes.breakpoints[bp.value];
    bpBlocks.push(
      <section className="breakpoint" key={bp.value}>
        <ToggleControl
          __nextHasNoMarginBottom
          label={bp.label}
          checked={span}
          onChange={(newValue) => updateBreakpoints(bp.value, newValue ? 2 : 0)}
        />
        {span && (
          <RangeControl
            __nextHasNoMarginBottom
            __next40pxDefaultSize
            label="Columns"
            value={span}
            onChange={(newSpan) => updateBreakpoints(bp.value, newSpan)}
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
        <PanelBody title={__("Settings", "jcore")}>
          <ToggleControl
            __nextHasNoMarginBottom
            label={__("Use Breakpoints")}
            help={
              useBreakpoints
                ? __("Set span values by breakpoints.")
                : __("Set one span value.")
            }
            checked={useBreakpoints}
            onChange={(newValue) => setAttributes({ useBreakpoints: newValue })}
          />
          {useBreakpoints || (
            <RangeControl
              __nextHasNoMarginBottom
              __next40pxDefaultSize
              label="Span"
              value={span}
              onChange={(newSpan) => setAttributes({ span: newSpan })}
              min={1}
              max={6}
            />
          )}
          {useBreakpoints && bpBlocks}
        </PanelBody>
      </InspectorControls>

      <div {...useBlockProps(generateColumnProps(attributes))}>
        <InnerBlocks />
      </div>
    </>
  );
}
