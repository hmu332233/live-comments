function injectHTML() {
  document.write(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Page</title>
        <link rel="stylesheet" href="http://localhost:1234/index.2ad15953.css">
        </head>
        <body>
        <div id="app"></div>
      </body>
    </html>
  `);
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectHTML,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['index.f3184941.js'],
  });
});
