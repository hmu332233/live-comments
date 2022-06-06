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

  const handleResolveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onResolveClick();
  };

  return (
    <div
      className={cn(
        'flex flex-col p-4 border-b gap-2 cursor-pointer hover:bg-base-200',
        item.resolved && 'opacity-20',
      )}
      onClick={onClick}
    >
      <Comment comment={firstComment} />
      <button
        className="btn btn-primary btn-xs ml-auto"
        onClick={handleResolveClick}
      >
        resolve
      </button>
    </div>
  );
}

export default PostItem;
