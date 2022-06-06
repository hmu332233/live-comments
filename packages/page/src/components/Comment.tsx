import React from 'react';
import { IComment } from 'types';

type Props = {
  comment: IComment;
};

function Comment({ comment }: Props) {
  return (
    <div className={'flex flex-col gap-2'}>
      <div className="text-lg font-extrabold">{comment.userName}</div>
      <div className="badge badge-outline">
        {new Date(comment.timestamp).toLocaleString()}
      </div>
      <p>{comment.text}</p>
    </div>
  );
}

export default Comment;
