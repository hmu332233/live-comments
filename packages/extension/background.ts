// self.importScripts('firebase/firebase-app.js');
// self.importScripts('firebase/firebase-firestore.js');
// self.importScripts('firebase/firebase-auth.js');

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

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

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(firebaseApp);

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

let unsubscribe;

chrome.runtime.onMessage.addListener(
  async ({ action, payload }, sender, sendResponse) => {
    console.log(action, payload);
    switch (action) {
      case 'INIT_MAIN': {
        const { code } = payload;
        unsubscribe?.();

        const q = query(
          collection(db, 'posts'),
          where('pageCode', '==', code),
          orderBy('timestamp', 'desc'),
        );
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          var cities = [];
          querySnapshot.forEach((doc) => {
            cities.push({
              id: doc.id,
              ...doc.data(),
            });
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
      case 'EXIT_MAIN': {
        unsubscribe?.();
        break;
      }
      case 'LOGIN': {
        const { name, code, url } = payload;
        signInAnonymously(auth)
          .then(() => {
            // Signed in..
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });

        // 로그인/로그아웃 처리
        onAuthStateChanged(auth, async (firebaseUser) => {
          if (!firebaseUser) {
            return;
          }

          console.log('code', code);
          const docRef = doc(db, 'pages', code);
          const docSnap = await getDoc(docRef);

          if (!docSnap.exists()) {
            setDoc(docRef, { code, url });
          }

          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: 'LOGIN_COMPLETE',
              payload: {
                user: {
                  id: firebaseUser.uid,
                  name,
                  lastSignInTime: firebaseUser.metadata.lastSignInTime,
                },
                page: { code, url },
              },
            });
          });
        });
        break;
      }
      case 'ADD_COMMENT': {
        const docRef = await addDoc(collection(db, 'posts'), payload);
        console.log('Document written with ID: ', docRef.id);

        break;
      }
      case 'UPDATE_COMMENT': {
        const { id } = payload;
        const docRef = doc(db, 'posts', id);
        await updateDoc(docRef, payload);
        break;
      }
    }
  },
);
