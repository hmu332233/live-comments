import React, { useContext, useEffect, useRef, useState } from 'react';

import { IComment, IPost, IPostPointer } from '../types';

import { optimizeScroll, getSelectorFromCursor, isNotEmpty } from '../utils';
import CommentInput from '../components/CommentInput';
import PostPointer from '../components/PostPointer';
import HighlightBox from '../components/HighlightBox';
import CommentList from '../components/CommentList';
import Iframe from '../components/Iframe';
import { AuthStateContext } from '../contexts/AuthContext';
import Header from '../components/Header';

type Props = {};

function Main({}: Props) {
  const { user, page } = useContext(AuthStateContext)!;
  const [loaded, setLoaded] = useState(false);
  const [activePostId, setActivePostId] = useState('');
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
    ref.current.contentWindow?.addEventListener(
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

    setLoaded(true);
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
      posts
        .map((post) => {
          const element = contentDocument.querySelector(post.selector);
          if (!element) {
            return null;
          }

          const elemRect = element.getBoundingClientRect();
          const offsetY = elemRect.top - bodyRect.top;
          return {
            post,
            x: elemRect.left,
            y: elemRect.top,
            show: offsetY > 0,
          };
        })
        .filter(isNotEmpty),
    );
  }, [posts, isScrolling]);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    chrome.runtime.sendMessage({
      action: 'INIT_MAIN',
      payload: { code: page.code },
    });

    chrome.runtime.onMessage.addListener(
      ({ action, payload }, sender, sendResponse) => {
        switch (action) {
          case 'UPDATE_COMMENTS': {
            console.log(payload);
            setPosts(payload);
            break;
          }
        }
      },
    );
  }, [loaded]);

  useEffect(() => {
    window.addEventListener('beforeunload', (e) => {
      chrome.runtime.sendMessage({
        action: 'EXIT_MAIN',
      });
      e.preventDefault();
      e.returnValue = '';
    });
  }, []);

  const handleSubmit = (text: string) => {
    const newComment: IComment = {
      id: `cm_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      text,
      timestamp: Date.now(),
    };

    const newPost: IPost = {
      userId: user.id,
      selector: commentPosition.selector,
      timestamp: Date.now(),
      comments: [newComment],
      pageCode: page.code,
    };
    setCommentPosition((v) => ({ ...v, show: false }));

    chrome.runtime.sendMessage({ action: 'ADD_COMMENT', payload: newPost });
  };

  const handlePointerClick = (postId: string) => {
    setActivePostId(postId);
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
      userId: user.id,
      userName: user.name,
      text,
      timestamp: Date.now(),
    };

    const post = posts.find((post) => post.id === postId)!;
    const newPost = {
      ...post,
      comments: [...post.comments, newComment],
    };
    chrome.runtime.sendMessage({ action: 'UPDATE_COMMENT', payload: newPost });
  };

  const handleItemClick = (postId: string) => {
    console.log('active', postId);
    setActivePostId(postId);

    // NOTE: 컨셉 확인용 코드. 추후에 옮기기
    const contentDocument = ref.current?.contentDocument as Document;
    const post = posts.find((post) => post.id === postId)!;

    const element = contentDocument.querySelector(post.selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleItemResolveClick = (id: string) => {
    const post = posts.find((post) => post.id === id)!;
    const newPost = {
      ...post,
      resolved: !post.resolved,
    };

    chrome.runtime.sendMessage({ action: 'UPDATE_COMMENT', payload: newPost });
  };

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="flex relative w-full h-full">
        <HighlightBox {...highlightBoxPosition} />
        <Iframe ref={ref} src={location.href} onLoad={handleLoaded} />
        {!isScrolling && (
          <div className="absolute w-full top-0 left-0">
            {commentsWithPosition
              .filter((v) => v.show && !v.post.resolved)
              .map(({ post, x, y }, index) => (
                <PostPointer
                  key={post.id}
                  position={{ x, y }}
                  post={post}
                  openBox={activePostId === post.id}
                  onClick={handlePointerClick}
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
        <CommentList
          list={posts}
          onItemClick={handleItemClick}
          onItemResolveClick={handleItemResolveClick}
        />
      </div>
    </div>
  );
}

export default Main;
