import React, { useEffect } from 'react';
import useToggle from '../hooks/useToggle';

type Props = {
  text: string;
  position: { x: number; y: number };
  openBox: Boolean;
};

function CommentPoint({ text, position, openBox }: Props) {
  const [isBoxOpen, toggle, setIsBoxOpen] = useToggle();

  useEffect(() => {
    setIsBoxOpen(openBox);
  }, [openBox]);

  const handlePointClick = () => {
    toggle();
  };
  return (
    <div
      className="absolute flex"
      style={{ left: position.x, top: position.y }}
    >
      <span className="relative cursor-pointer" onClick={handlePointClick}>
        <span className="badge badge-info animate-ping absolute opacity-75" />
        <span className="badge badge-info" />
      </span>
      {isBoxOpen && (
        <div className="card w-48 bg-base-100 shadow-xl ml-20">
          <div className="card-body p-4 gap-4">
            <p>{text}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-xs">Resolve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentPoint;
