import React, { useEffect } from 'react';
import { IPost } from 'types';
import useToggle from '../hooks/useToggle';
import Comment from './Comment';

type Props = {
  post: IPost;
  position: { x: number; y: number };
  openBox?: Boolean;
  onClick: (id: string) => void;
  onCommentSubmit: ({ postId, text }: { postId: string; text: string }) => void;
};

function PostPointer({
  post,
  position,
  openBox,
  onClick,
  onCommentSubmit,
}: Props) {
  const handlePointClick = () => {
    onClick(post.id!);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const { comment } = Object.fromEntries(formData);

    onCommentSubmit({ postId: post.id!, text: comment as string });

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
      {openBox && (
        <div className="card max-w-xs bg-base-100 border ml-20">
          <div className="card-body p-4 gap-4 max-h-96 overflow-y-auto">
            {comments.map((comment) => (
              <Comment comment={comment} />
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
