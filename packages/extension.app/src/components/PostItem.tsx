import React from 'react';
import { IComment, IPost } from 'types';
import Comment from './Comment';
import cn from 'classnames';

type Props = {
  item: IComment;
  onClick: () => void;
  onResolveClick: () => void;
};

function PostItem({ item, onClick, onResolveClick }: Props) {
  const handleResolveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onResolveClick();
  };

  return (
    <div
      className={cn(
        'flex flex-col p-4 border-b gap-4 cursor-pointer hover:bg-base-200',
        // item.resolved && 'opacity-20',
      )}
      onClick={onClick}
    >
      <Comment comment={item} />
      {/* <button
        className="btn btn-primary btn-xs ml-auto"
        onClick={handleResolveClick}
      >
        HIDE
      </button> */}
    </div>
  );
}

export default PostItem;
