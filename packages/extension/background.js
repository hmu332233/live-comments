self.importScripts('firebase/firebase-app.js');
self.importScripts('firebase/firebase-auth.js');

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

const firebaseConfig = {};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectHTML,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['dist/index.6c92a201.js'],
  });

  // chrome.identity.getAuthToken({}, (token) => {
  //   console.log(token)
  //   let credential = firebase.auth.GoogleAuthProvider.credential(null, token)
  //   app
  //     .auth()
  //     .signInWithCredential(credential)
  //     .then((userCredential) => {
  //       const user = firebase.auth().currentUser
  //       console.log(user)
  //     })
  //     .catch((error) => {
  //       console.error(error)

  //     })
  // })
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      // Signed in..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  firebase.auth().onAuthStateChanged(function (firebaseUser) {
    if (!firebaseUser) {
      return;
    }

    const {
      multiFactor: { user },
    } = firebaseUser;

    console.log(user);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'LOGIN_COMPLETE', payload: user },
        function (response) {},
      );
    });
  });
});
