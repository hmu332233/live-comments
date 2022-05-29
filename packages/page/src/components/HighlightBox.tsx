import React from 'react';

type Props = {
  width: number;
  height: number;
  x: number;
  y: number;
};

function HighlightBox({ width, height, x, y }: Props) {
  return (
    <div
      className="absolute outline outline-1 outline-offset-2 pointer-events-none"
      style={{ width, height, left: x, top: y }}
    ></div>
  );
}

export default HighlightBox;
