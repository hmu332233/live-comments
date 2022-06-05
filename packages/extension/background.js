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

// TODO: background가 꺼졌을때 또는 연결된 페이지들이 꺼졌을때 Snapshot 제거하는 로직 필요함

chrome.runtime.onMessage.addListener(
  ({ action, payload }, sender, sendResponse) => {
    console.log(action, payload);
    switch (action) {
      case 'INIT_MAIN': {
        const { url } = payload;
        db.collection('posts')
          .where('url', '==', url)
          .onSnapshot((querySnapshot) => {
            var cities = [];
            querySnapshot.forEach((doc) => {
              cities.push(doc.data());
            });

            console.log('호출됨');

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              console.log(tabs);
              chrome.tabs.sendMessage(tabs[0].id, {
                action: 'UPDATE_COMMENTS',
                payload: cities,
              });
            });
          });
        break;
      }
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
            chrome.tabs.sendMessage(tabs[0].id, {
              action: 'LOGIN_COMPLETE',
              payload: user,
            });
          });
        });
        break;
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
        break;
      }
    }
  },
);
