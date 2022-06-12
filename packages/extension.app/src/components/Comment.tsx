import React from 'react';
import { IComment } from 'types';

type Props = {
  comment: IComment;
};

function Comment({ comment }: Props) {
  return (
    <div className={'flex flex-col'}>
      <div className="text-md font-extrabold">{comment.userName}</div>
      <div className="text-gray-500 text-xs">
        {new Date(comment.timestamp).toLocaleString()}
      </div>
      <p className="mt-2 text-sm">{comment.text}</p>
    </div>
  );
}

export default Comment;
