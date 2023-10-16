import React from 'react';

// types
import { getColorText } from 'helpers/getColorText';

function GraphChart({ variant }) {
  const divRef = React.useRef(null);
  const [options, setOptions] = React.useState(null);

  React.useLayoutEffect(() => {
    if (!variant || !divRef) return;
    const lowerBound = variant?.confidentialInternal?.lowerBound || 0;
    const upperBound = variant?.confidentialInternal?.upperBound || 0;
    const midpoint = variant?.confidentialInternal?.changes || 0;
    let colorTrack = '#a0a0a0';
    const colorTextLow = getColorText(lowerBound);
    const colorTextMid = getColorText(midpoint);
    const colorTextUpper = getColorText(upperBound);

    let low = lowerBound * 100;
    let upper = upperBound * 100;
    let midPercent = Number(upper) - Number(low);
    let trackWidth = 0;

    if (low < 0) {
      low *= -1;
      upper = Number(upper) + Number(low);
      midPercent = low;
      trackWidth = Number(upper) - Number(low);
    }

    if (lowerBound < 0 && upperBound < 0) {
      colorTrack = '#f00';
    }
    if (lowerBound > 0 && upperBound > 0) {
      colorTrack = '#239126';
    }

    const payload = {
      trackWidth,
      midPercent,
      lowerBound,
      low,
      upper,
      midpoint,
      upperBound,
      colorTrack,
      colorTextLow,
      colorTextMid,
      colorTextUpper,
      width: divRef.current?.offsetWidth,
    };
    setOptions(payload);
  }, [variant]);

  let trackWidth = options?.trackWidth || 0;
  let upperRight = options?.upper || 0;

  if (trackWidth < 2) {
    trackWidth = 15;
    upperRight = 15;
  }

  return (
    <>
      <div ref={divRef} id="slider_horizontal" className="slider_horizontal">
        {options && (
          <>
            <div className="slider_rail" />
            <div
              className="slider_track"
              style={{
                backgroundColor: options.colorTrack,
                width: `${trackWidth}%`,
                left: `${options.midPercent}%`,
              }}
            />

            <div id="low" className="slider_handle slider_handle-left" style={{ backgroundColor: options.colorTrack, left: `${options.low}%`, color: options.colorTextLow }}>
              <span>{(options.lowerBound * 100).toFixed(2) + '%'}</span>
            </div>

            <div
              id="midpoint"
              className="slider_handle slider_handle-middle"
              style={{
                backgroundColor: options.colorTrack,
                left: `${(options.low + upperRight) / 2}%`,
                color: options.colorTextMid,
              }}
            >
              <span>{(options.midpoint * 100).toFixed(2) + '%'}</span>
            </div>

            <div
              id="upper"
              className="slider_handle slider_handle-right"
              style={{
                backgroundColor: options.colorTrack,
                left: `${upperRight}%`,
                color: options.colorTextUpper,
              }}
            >
              <span>{(options.upperBound * 100).toFixed(2) + '%'}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default GraphChart;
