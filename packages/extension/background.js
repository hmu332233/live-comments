function injectHTML() {
  document.write(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Page</title>
        <link rel="stylesheet" href="http://localhost:1234/index.433a9dfd.css">
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
    files: ['dist/index.6c92a201.js'],
  });
});
