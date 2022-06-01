import React from 'react';
import { IPost } from 'types';
import Comment from './Comment';
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
      <Comment comment={firstComment} />
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
