import React from 'react';
import { IPost } from 'types';

import cn from 'classnames';

type Props = {
  item: IPost;
  onClick: () => void;
  onResolveClick: () => void;
};

function PostItem({ item, onClick, onResolveClick }: Props) {
  const {
    comments: [firstComment],
  } = item;
  return (
    <div
      className={cn(
        'flex flex-col p-4 border-b gap-2',
        item.resolved && 'opacity-20',
      )}
      onClick={onClick}
    >
      <div className="text-lg font-extrabold">mark.han</div>
      <div className="badge badge-ghost">
        {new Date(item.timestamp).toLocaleString()}
      </div>
      <p className="text-base-content/70 text-sm">{firstComment.text}</p>
      <button
        className="btn btn-primary btn-xs ml-auto"
        onClick={onResolveClick}
      >
        resolve
      </button>
    </div>
  );
}

export default PostItem;
