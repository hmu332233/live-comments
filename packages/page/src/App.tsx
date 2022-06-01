import React, { useEffect, useRef, useState } from 'react';

import { IComment, IPost, IPostPointer } from './types';

import {
  optimizeScroll,
  getSelectorFromCursor,
  addNormalizedData,
} from './utils';
import CommentInput from './components/CommentInput';
import PostPointer from './components/PostPointer';
import HighlightBox from './components/HighlightBox';
import PostList from './components/PostList';

type Props = {};

function App({}: Props) {
  const [commentPosition, setCommentPosition] = useState({
    show: false,
    x: 0,
    y: 0,
    selector: '',
  });

  const [highlightBoxPosition, setHighlightBoxPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [isScrolling, setIsScrolling] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [commentsWithPosition, setCommentsWithPosition] = useState<
    IPostPointer[]
  >([]);
  const ref = useRef<HTMLIFrameElement>(null);

  const handleLoaded = () => {
    if (!ref.current || !ref.current.contentDocument) {
      return;
    }

    const contentDocument = ref.current.contentDocument;
    const getCursor = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const { selector } = getSelectorFromCursor(
        contentDocument,
        event.clientX,
        event.clientY,
      );
      console.log(selector);

      // setItems(v => [...v, { x, y, offsetY, selector }]);
      // setSelectors((v) => [...v, selector]);
      if (!selector) {
        return;
      }

      setCommentPosition({
        show: true,
        x: event.clientX,
        y: event.clientY,
        selector,
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { element, x, y } = getSelectorFromCursor(
        contentDocument,
        event.clientX,
        event.clientY,
      );

      const { offsetWidth: width, offsetHeight: height } = element;

      setHighlightBoxPosition({ width, height, x, y });
    };

    contentDocument.body.addEventListener(
      'mousemove',
      optimizeScroll(handleMouseMove),
      false,
    );

    contentDocument.body.addEventListener('click', getCursor, false);

    var timeoutId;
    ref.current.contentWindow.addEventListener(
      'scroll',
      function (event) {
        setIsScrolling(true);
        setCommentPosition((v) => ({ ...v, show: false }));
        // Clear our timeout throughout the scroll
        window.clearTimeout(timeoutId);

        // Set a timeout to run after scrolling ends
        timeoutId = setTimeout(function () {
          // Run the callback
          console.log('Scrolling has stopped.');
          setIsScrolling(false);
        }, 66);
      },
      false,
    );
  };

  useEffect(() => {
    if (!ref.current || !ref.current.contentDocument) {
      return;
    }

    if (isScrolling) {
      return;
    }

    const contentDocument = ref.current.contentDocument as Document;

    const bodyRect = contentDocument.body.getBoundingClientRect();

    setCommentsWithPosition(
      posts.map((post) => {
        const elemRect = contentDocument
          .querySelector(post.selector)!
          .getBoundingClientRect();
        const offsetY = elemRect.top - bodyRect.top;
        return {
          post,
          x: elemRect.left,
          y: elemRect.top,
          show: offsetY > 0,
        };
      }),
    );
  }, [posts, isScrolling]);

  const handleSubmit = (text: string) => {
    const newComment: IComment = {
      id: `cm_${Date.now()}`,
      userId: 'mark',
      text,
      timestamp: Date.now(),
    };

    const newPost: IPost = {
      id: `p_${Date.now()}`,
      userId: 'mark',
      selector: commentPosition.selector,
      timestamp: Date.now(),
      comments: [newComment],
    };
    setPosts((v) => [...v, newPost]);
    setCommentPosition((v) => ({ ...v, show: false }));
  };

  const handleCommentSubmit = ({
    postId,
    text,
  }: {
    postId: string;
    text: string;
  }) => {
    const newComment: IComment = {
      id: `cm_${Date.now()}`,
      userId: 'mark',
      text,
      timestamp: Date.now(),
    };

    const index = posts.findIndex((post) => post.id === postId);
    setPosts((v) => {
      const newPosts = [...v];
      const post = newPosts[index];
      newPosts[index] = {
        ...post,
        comments: [...post.comments, newComment],
      };
      return newPosts;
    });
  };

  const handleItemClick = (id: string) => {
    console.log('item clicked', id);
  };

  const handleItemResolveClick = (id: string) => {
    const index = posts.findIndex((post) => post.id === id);
    setPosts((v) => {
      const newPosts = [...v];
      const post = newPosts[index];
      newPosts[index] = {
        ...post,
        resolved: !post.resolved,
      };
      return newPosts;
    });
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="flex relative w-full h-full">
        <HighlightBox {...highlightBoxPosition} />
        <iframe
          id="testFrame"
          ref={ref}
          className="w-full"
          src={location.href}
          onLoad={handleLoaded}
          sandbox="allow-scripts allow-forms allow-same-origin allow-presentation allow-orientation-lock allow-modals allow-popups-to-escape-sandbox allow-pointer-lock"
        />
        {!isScrolling && (
          <div className="absolute w-full top-0 left-0">
            {commentsWithPosition
              .filter((v) => v.show && !v.post.resolved)
              .map(({ post, x, y }, index) => (
                <PostPointer
                  position={{ x, y }}
                  post={post}
                  onCommentSubmit={handleCommentSubmit}
                />
              ))}
            {commentPosition.show && (
              <CommentInput
                onSubmit={handleSubmit}
                position={{ x: commentPosition.x, y: commentPosition.y }}
              />
            )}
          </div>
        )}
      </div>
      <PostList
        list={posts}
        onItemClick={handleItemClick}
        onItemResolveClick={handleItemResolveClick}
      />
    </div>
  );
}

export default App;
