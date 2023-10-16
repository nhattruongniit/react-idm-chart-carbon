import React from 'react';

const DRAW_ZONE_WIDTH = 240;
const DRAW_ZONE_HEIGHT = 60;
const DRAW_ZONE_MARGIN = 20;
const CANVAS_WIDTH = DRAW_ZONE_WIDTH + 2 * DRAW_ZONE_MARGIN;
const CANVAS_HEIGHT = DRAW_ZONE_HEIGHT + 2 * DRAW_ZONE_MARGIN;
const BAR_MARGIN = 7;

function drawCircle({ ctx, color, x, y = DRAW_ZONE_MARGIN + BAR_MARGIN, radius }) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.stroke();
}

function ViolinGraph({ variant }) {
  const divRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = divRef.current;
    if (!canvas) return;
    const { offsetWidth, offsetHeight } = container;
    const halfOffsetWitdh = offsetWidth / 2;
    const halfOffsetHeight = offsetHeight / 2;
    canvas.width = offsetWidth;
    canvas.height = offsetHeight;

    console.log('container: ', {
      width: offsetWidth,
      halfOffsetWitdh,
      variant,
      point: offsetWidth / 10,
    });

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.moveTo(0, halfOffsetHeight);
    ctx.lineTo(offsetWidth, halfOffsetHeight);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // draw circle middle
    drawCircle({
      ctx,
      color: '#f00',
      x: halfOffsetWitdh - 5,
      y: offsetHeight / 2,
      radius: 7,
      width: 3,
      height: 20,
    });
  }, []);

  return (
    <div ref={divRef} className="w-full">
      <canvas ref={canvasRef} width="100%" height="100%" />
    </div>
  );
}

export default ViolinGraph;
