import React, { useEffect, useRef, useState } from 'react';
import { optimizeScroll, getSelectorFromCursor } from './utils';

type Props = {};

function App({}: Props) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [items, setItems] = useState([]);
  const [selectors, setSelectors] = useState([]);
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
      setSelectors((v) => [...v, selector]);
      event.preventDefault();
    };

    // contentDocument.body.addEventListener(
    //   'mousemove',
    //   optimizeScroll(getCursor),
    //   false,
    // );

    contentDocument.body.addEventListener('mouseup', getCursor, false);

    var timeoutId;
    contentDocument.addEventListener(
      'scroll',
      function (event) {
        setIsScrolling(true);
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

    setItems(
      selectors.map((selector) => {
        const elemRect = contentDocument
          .querySelector(selector)
          .getBoundingClientRect();
        const offsetY = elemRect.top - bodyRect.top;

        console.log(offsetY);
        return { x: elemRect.left, y: elemRect.top, isShowing: offsetY > 0 };
      }),
    );
  }, [selectors, isScrolling]);

  return (
    <div className="flex w-screen h-screen">
      <div className="flex relative w-full h-full">
        <iframe
          id="testFrame"
          ref={ref}
          className="w-full"
          src={location.href}
          onLoad={handleLoaded}
        />
        {!isScrolling && (
          <div className="absolute w-full top-0 left-0">
            {items.map((item) => (
              <div className="absolute" style={{ left: item.x, top: item.y }}>
                아이템
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-32">
        {items.map((item) => (
          <div>{JSON.stringify(item)}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
