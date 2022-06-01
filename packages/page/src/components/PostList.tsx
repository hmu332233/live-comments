import React from 'react';
import { IPost } from '../types';

import PostItem from './PostItem';

type Props = {
  list: IPost[];
  onItemClick: (id: string) => void;
  onItemResolveClick: (id: string) => void;
};

function PostList({ list, onItemClick, onItemResolveClick }: Props) {
  return (
    <div className="w-96 border-l">
      {list.map((item) => (
        <PostItem
          key={item.id}
          item={item}
          onClick={() => onItemClick(item.id)}
          onResolveClick={() => onItemResolveClick(item.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
