import React from 'react';
import { IComment, IPost } from '../types';

import PostItem from './PostItem';

type Props = {
  list: IPost[];
  onItemClick: (id: string) => void;
  onItemResolveClick: (id: string) => void;
};

function CommentList({ list, onItemClick, onItemResolveClick }: Props) {
  const comments = list
    .reduce((arr: IComment[], post) => {
      return [...arr, ...post.comments];
    }, [])
    .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
  return (
    <div className="w-96 border-l overflow-y-auto">
      {comments.map((item) => (
        <PostItem
          key={item.id}
          item={item}
          onClick={() => onItemClick(item.id!)}
          onResolveClick={() => onItemResolveClick(item.id!)}
        />
      ))}
    </div>
  );
}

export default CommentList;
