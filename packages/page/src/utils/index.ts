import { finder } from '@medv/finder';
import type { NormalizedData } from 'types';

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

export const normalizeBy = (key: string) => {
  return (data: { [key: string]: any }, item: any) => {
    data[item[key]] = item;
    return data;
  };
};

export const normalizeData = <Type>(
  data: any[],
  key: string,
): NormalizedData<Type> => {
  return {
    ids: data.map((item) => item[key]),
    entities: data.reduce(normalizeBy(key), {}),
  };
};

// FIXME: any를 사용하지 않는 방향으로 개선 필요
export const addNormalizedData = <Type>(
  { ids, entities }: NormalizedData<Type>,
  newData: any,
  key: string,
) => {
  return {
    ids: [...ids, newData[key]],
    entities: { ...entities, [newData[key]]: newData },
  };
};
