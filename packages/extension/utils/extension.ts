type sendMessageProps = {
  action: string;
  payload: any;
};
export function sendMessageToPage({ action, payload }: sendMessageProps) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0]?.id;
    if (!tabId) {
      return;
    }
    chrome.tabs.sendMessage(tabId, { action, payload });
  });
}

export function initApp(tabId: number, code?: string) {
  chrome.scripting.executeScript({
    target: { tabId },
    func: injectHTML,
    args: [code || ''],
  });
  chrome.scripting.insertCSS({
    target: { tabId },
    files: ['index.1735c4fb.css'],
  });
  chrome.scripting.executeScript({
    target: { tabId },
    files: ['index.1249ad80.js'],
  });
}

function injectHTML(code: string) {
  document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <link rel="stylesheet" as="style" crossorigin="" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
          </head>
          <body>
          <div id="app"></div>
          <script id="__LIVE_COMMENTS_DATA__" type="application/json">{"props": { "code": "${
            code || ''
          }"}}</script>
        </body>
      </html>
    `);
}
