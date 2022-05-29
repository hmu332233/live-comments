import React from 'react';
import type { Comment } from 'types';

import cn from 'classnames';

type Props = {
  item: Comment;
  onClick: () => void;
  onResolveClick: () => void;
};

function CommentListItem({ item, onClick, onResolveClick }: Props) {
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
      <p className="text-base-content/70 text-sm">{item.text}</p>
      <button
        className="btn btn-primary btn-xs ml-auto"
        onClick={onResolveClick}
      >
        resolve
      </button>
    </div>
  );
}

export default CommentListItem;
