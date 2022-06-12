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

export function initApp(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectHTML,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['index.9a60d6fe.js'],
  });
}

function injectHTML() {
  document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <link rel="stylesheet" as="style" crossorigin="" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
          <link rel="stylesheet" as="style" href="http://localhost:1234/index.f762c381.css">
          </head>
          <body>
          <div id="app"></div>
        </body>
      </html>
    `);
}
