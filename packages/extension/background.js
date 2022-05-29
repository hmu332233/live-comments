const code = `
  document.write(\`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Page</title>
        <link rel="stylesheet" href="http://localhost:1234/index.2ad15953.css">
        </head>
        <body>
        <div id="app"></div>

        <script src="http://localhost:1234/index.f3184941.js"></script>
      </body>
    </html>
  \`);
`;

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({
    code,
  });
});
