import { ActionName, ControllerFuncMap } from './types';
import {
  addComment,
  exitMain,
  initMain,
  login,
  movePage,
  updateComment,
  validateCode,
} from './controller';
import { isAction } from './utils/type';
import { initApp } from './utils/extension';

chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) {
    return;
  }

  initApp(tab.id);
});

// TODO: 내부용, 외부용 action 나눠서 관리하기
const ACTIONS: ControllerFuncMap = {
  INIT_MAIN: initMain,
  EXIT_MAIN: exitMain,
  LOGIN: login,
  ADD_COMMENT: addComment,
  UPDATE_COMMENT: updateComment,
  VALIDATE_CODE: validateCode,
  MOVE_PAGE: movePage,
};

const listener = async (
  { action: actionKey, payload },
  sender,
  sendResponse,
) => {
  console.log(actionKey, payload);

  if (!isAction(actionKey)) {
    return console.log('정의되지 않은 action 실행', actionKey);
  }

  const action = ACTIONS[actionKey as ActionName];
  await action({ payload, sender, sendResponse });
};

chrome.runtime.onMessage.addListener(listener);
chrome.runtime.onMessageExternal.addListener(listener);
