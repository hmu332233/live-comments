import React from 'react';
import { IComment } from 'types';

type Props = {
  comment: IComment;
};

function Comment({ comment }: Props) {
  return (
    <div className={'flex flex-col'}>
      <div className="text-lg font-extrabold">{comment.userName}</div>
      <div className="text-sm">
        {new Date(comment.timestamp).toLocaleString()}
      </div>
      <p className="mt-2">{comment.text}</p>
    </div>
  );
}

export default Comment;
