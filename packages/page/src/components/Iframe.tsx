import React, { ForwardedRef, forwardRef } from 'react';

type Props = {
  src: string;
  onLoad: () => void;
};

function Iframe({ src, onLoad }: Props, ref: ForwardedRef<HTMLIFrameElement>) {
  return (
    <iframe
      ref={ref}
      className="w-full"
      src={src}
      onLoad={onLoad}
      sandbox="allow-scripts allow-forms allow-same-origin allow-presentation allow-orientation-lock allow-modals allow-popups-to-escape-sandbox allow-pointer-lock"
    />
  );
}

export default forwardRef<HTMLIFrameElement, Props>(Iframe);
