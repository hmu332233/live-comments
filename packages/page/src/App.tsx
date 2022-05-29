import React, { useEffect, useRef } from 'react';
import { optimizeScroll, getSelectorFromCursor } from './utils';

type Props = {};

function App({}: Props) {
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
    };

    contentDocument.body.addEventListener(
      'mousemove',
      optimizeScroll(getCursor),
      false,
    );
  };

  return (
    <div className="flex w-screen h-screen">
      <iframe
        id="testFrame"
        ref={ref}
        className="w-full"
        src={location.href}
        onLoad={handleLoaded}
      />
    </div>
  );
}

export default App;
