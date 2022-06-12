import { ControllerFuncMap } from './types';
import {
  addComment,
  exitMain,
  initMain,
  login,
  updateComment,
} from './controller';

function test() {
  location.href = 'https://edu.goorm.io/';
}

function injectHTML() {
  document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <link rel="stylesheet" as="style" crossorigin="" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
          <link rel="stylesheet" as="style" href="http://localhost:1234/index.1c7c8538.css">
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
    files: ['index.fc65ed09.js'],
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
      return console.log('정의되지 않은 action 실행', actionKey);
    }

    await action({ payload, sendResponse });
  },
);

chrome.runtime.onMessageExternal.addListener(
  async ({ action: actionKey, payload }, sender, sendResponse) => {
    console.log(actionKey, sender);
    const { tab } = sender;
    if (actionKey === 'SHARE') {
      if (!tab?.id) {
        return;
      }

      sendResponse('say hi!');

      // chrome.scripting.executeScript({
      //   target: { tabId: tab.id },
      //   func: test,
      // }, () => {
      //   setTimeout(() => {
      //     initApp(tab);
      //   }, 3000)
      // });
    }
  },
);
