import React from 'react';

import cn from 'classnames';

type Props = {
  className?: string;
  position: { x: number; y: number };
  onSubmit: (v: string) => void;
};

function CommentInput({ className, position, onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const { comment } = Object.fromEntries(formData);

    onSubmit(comment as string);

    e.currentTarget.reset();
    e.preventDefault();
  };

  return (
    <form
      className={cn('absolute', className)}
      style={{ left: position.x, top: position.y }}
      onSubmit={handleSubmit}
    >
      <input
        name="comment"
        type="text"
        placeholder="Type here"
        className="input input-bordered input-md w-full max-w-xs"
      />
    </form>
  );
}

export default CommentInput;
