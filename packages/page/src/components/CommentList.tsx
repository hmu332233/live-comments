import React from 'react';
import type { Comment } from '../types';

import CommentListItem from './CommentListItem';

type Props = {
  list: Comment[];
  onItemClick: (id: string) => void;
  onItemResolveClick: (id: string) => void;
};

function CommentList({ list, onItemClick, onItemResolveClick }: Props) {
  return (
    <div className="w-96 border-l">
      {list.map((item) => (
        <CommentListItem
          key={item.id}
          item={item}
          onClick={() => onItemClick(item.id)}
          onResolveClick={() => onItemResolveClick(item.id)}
        />
      ))}
    </div>
  );
}

export default CommentList;
