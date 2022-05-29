import { finder } from '@medv/finder';

export const optimizeScroll = (callback: (event: any) => void) => {
  let ticking = false;
  return (event: any) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback(event);
        ticking = false;
      });
      ticking = true;
    }
  };
};

export const getSelectorFromCursor = (
  document: Document,
  x: number,
  y: number,
) => {
  const element = document.elementFromPoint(x, y);
  if (!element) {
    return {};
  }

  const rect = element.getBoundingClientRect();

  return {
    selector: finder(element, { root: document.body }),
    element,
    x: rect.left,
    y: rect.top,
  };
};
