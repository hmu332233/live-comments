import { ControllerFuncMap } from './types';
import {
  addComment,
  exitMain,
  initMain,
  login,
  updateComment,
} from './controller';

function injectHTML() {
  document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <link rel="stylesheet" as="style" crossorigin="" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
          <link rel="stylesheet" as="style" href="http://localhost:1234/index.433a9dfd.css">
          </head>
          <body>
          <div id="app"></div>
        </body>
      </html>
    `);
}

function initApp(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectHTML,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['dist/index.6c92a201.js'],
  });
}

chrome.action.onClicked.addListener((tab) => {
  initApp(tab);
});

const ACTIONS: ControllerFuncMap = {
  INIT_MAIN: initMain,
  EXIT_MAIN: exitMain,
  LOGIN: login,
  ADD_COMMENT: addComment,
  UPDATE_COMMENT: updateComment,
};

chrome.runtime.onMessage.addListener(
  async ({ action: actionKey, payload }, sender, sendResponse) => {
    const action = ACTIONS[actionKey];

    if (!action) {
      console.log('정의되지 않은 action 실행');
    }

    await action({ payload, sendResponse });
  },
);
