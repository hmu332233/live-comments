import React from 'react';

type Props = {
  text: string;
  position: { x: number; y: number };
};

function Comment({ text, position }: Props) {
  return (
    <div
      className="absolute card w-48 bg-base-100 shadow-xl"
      style={{ left: position.x, top: position.y }}
    >
      <div className="card-body p-4 gap-4">
        <p>{text}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-xs">Resolve</button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
