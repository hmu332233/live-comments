import React, { useEffect } from 'react';
import { IPost } from 'types';
import useToggle from '../hooks/useToggle';

type Props = {
  post: IPost;
  position: { x: number; y: number };
  openBox?: Boolean;
  onCommentSubmit: (v: string) => void;
};

function PostPointer({ post, position, openBox, onCommentSubmit }: Props) {
  const [isBoxOpen, toggle, setIsBoxOpen] = useToggle();

  useEffect(() => {
    setIsBoxOpen(openBox);
  }, [openBox]);

  const handlePointClick = () => {
    toggle();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const { comment } = Object.fromEntries(formData);

    onCommentSubmit(comment as string);

    e.currentTarget.reset();
    e.preventDefault();
  };

  const { comments } = post;

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
            {comments.map((comment) => (
              <p>{comment.text}</p>
            ))}
            <div className="card-actions justify-end">
              {/* <button className="btn btn-primary btn-xs">Resolve</button> */}
              <form onSubmit={handleSubmit}>
                <input
                  name="comment"
                  type="text"
                  placeholder="Type here"
                  className="input input-sm input-bordered w-full"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostPointer;
