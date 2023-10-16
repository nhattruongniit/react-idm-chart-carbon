/* eslint-disable prefer-destructuring */
import React from 'react';

function ViolinGraph({ variant }) {
  const divRef = React.useRef(null);
  const lowerBound = variant?.confidentalInternal?.lowerBound;
  const upperBound = variant?.confidentalInternal?.upperBound;
  // const midpoint = variant?.confidentalInternal?.changes;

  // const maxAbs = Math.max(Math.abs(lowerBound * 100), Math.abs(upperBound * 100));
  let low = lowerBound * 100;
  let upper = upperBound * 100;
  let midPercent = Number(upper) - Number(low);
  let width = 0;

  if (low < 0) {
    low *= -1;
    upper = Number(upper) + Number(low);
    midPercent = low;
    width = Number(upper) - Number(low);
  }

  React.useLayoutEffect(() => {
    if (!divRef.current) return;

    console.log('variant :', {
      variant,
      // maxAbs,
      low,
      upper,
      halfWidth: divRef.current?.offsetWidth / 2,
    });
  }, []);

  return (
    <div ref={divRef} className="slider_horizontal">
      <div className="slider_rail" />
      <div className="slider_track" style={{ backgroundColor: '#91caff', width: `${width}%`, left: `${midPercent}%` }} />

      <div id="start" className="slider_handle" style={{ backgroundColor: '#91caff', left: `${low}%` }}>
        {lowerBound.toFixed(2)}
      </div>

      <div id="end" className="slider_handle" style={{ backgroundColor: '#91caff', left: `${upper}%` }}>
        {upperBound.toFixed(2)}
      </div>
    </div>
  );
}

export default ViolinGraph;
