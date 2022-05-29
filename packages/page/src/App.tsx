import React, { useEffect, useRef, useState } from 'react';
import { optimizeScroll, getSelectorFromCursor } from './utils';
import CommentInput from './components/CommentInput';
import Comment from './components/Comment';

type Comment = {
  selector: string;
  text: string;
};

type Props = {};

function App({}: Props) {
  const [commentPosition, setCommentPosition] = useState({
    show: false,
    x: 0,
    y: 0,
    selector: '',
  });

  const [isScrolling, setIsScrolling] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsWithPosition, setCommentsWithPosition] = useState([]);
  const ref = useRef<HTMLIFrameElement>(null);

  const handleLoaded = () => {
    if (!ref.current || !ref.current.contentDocument) {
      return;
    }

    const contentDocument = ref.current.contentDocument;
    const getCursor = (event: MouseEvent) => {
      const selector = getSelectorFromCursor(
        contentDocument,
        event.clientX,
        event.clientY,
      );
      console.log(selector);

      // setItems(v => [...v, { x, y, offsetY, selector }]);
      // setSelectors((v) => [...v, selector]);

      setCommentPosition({
        show: true,
        x: event.clientX,
        y: event.clientY,
        selector,
      });

      event.preventDefault();
      event.stopPropagation();
    };

    // contentDocument.body.addEventListener(
    //   'mousemove',
    //   optimizeScroll(getCursor),
    //   false,
    // );

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

    const contentDocument = ref.current.contentDocument;

    const bodyRect = contentDocument.body.getBoundingClientRect();

    setCommentsWithPosition(
      comments.map((comment) => {
        const elemRect = contentDocument
          .querySelector(comment.selector)
          .getBoundingClientRect();
        const offsetY = elemRect.top - bodyRect.top;
        return {
          ...comment,
          x: elemRect.left,
          y: elemRect.top,
          show: offsetY > 0,
        };
      }),
    );
  }, [comments, isScrolling]);

  const handleSubmit = (text: string) => {
    const newComment: Comment = {
      selector: commentPosition.selector,
      text,
    };
    setComments((v) => [...v, newComment]);
    setCommentPosition((v) => ({ ...v, show: false }));
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="flex relative w-full h-full">
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
              .filter((v) => v.show)
              .map(({ text, x, y }, index) => (
                <Comment position={{ x, y }} text={text} />
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

      <div className="w-32">
        {comments.map((comment) => (
          <div>{JSON.stringify(comment)}</div>
        ))}
        <br />
        {commentsWithPosition.map((comment) => (
          <div>{JSON.stringify(comment)}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
