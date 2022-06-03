self.importScripts('firebase/firebase-app.js');
self.importScripts('firebase/firebase-firestore.js');
self.importScripts('firebase/firebase-auth.js');

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

const firebaseConfig = {};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectHTML,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['page/dist/index.f3184941.js'],
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

chrome.runtime.onMessage.addListener(
  ({ action, payload }, sender, sendResponse) => {
    switch (action) {
      case 'LOGIN': {
        auth
          .signInAnonymously()
          .then(() => {
            // Signed in..
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });

        // 로그인/로그아웃 처리
        auth.onAuthStateChanged(function (firebaseUser) {
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
      }
      case 'ADD_COMMENT': {
        db.collection('posts')
          .add(payload)
          .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      }
    }
  },
);
