import React from 'react';
import { IComment } from 'types';

type Props = {
  comment: IComment;
};

function Comment({ comment }: Props) {
  return (
    <div className={'flex flex-col gap-2'}>
      <div className="text-lg font-extrabold">mark.han</div>
      <div className="badge badge-ghost">
        {new Date(comment.timestamp).toLocaleString()}
      </div>
      <p>{comment.text}</p>
    </div>
  );
}

export default Comment;
