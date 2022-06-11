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
  Unsubscribe,
} from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

import { sendMessageToPage } from './utils/extension';
import { ControllerProps } from './types';

const firebaseConfig = {};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(firebaseApp);

let unsubscribe: Unsubscribe;

export async function initMain({ payload }: ControllerProps) {
  const { code } = payload;
  unsubscribe?.();

  const q = query(
    collection(db, 'posts'),
    where('pageCode', '==', code),
    orderBy('timestamp', 'desc'),
  );
  unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      posts.push({
        ...post,
        id: doc.id,
        comments: post.comments.map((c) => ({ ...c, postId: doc.id })),
      });
    });

    console.log('호출됨');

    sendMessageToPage({
      action: 'UPDATE_COMMENTS',
      payload: posts,
    });
  });
}

export async function exitMain({ payload }: ControllerProps) {
  unsubscribe?.();
}

export async function login({ payload }: ControllerProps) {
  const { name, code, url } = payload;

  signInAnonymously(auth)
    .then((user) => {
      console.log(user);
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

    sendMessageToPage({
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
}

export async function addComment({ payload }: ControllerProps) {
  const docRef = await addDoc(collection(db, 'posts'), payload);
  console.log('Document written with ID: ', docRef.id);
}

export async function updateComment({ payload }: ControllerProps) {
  const { id } = payload;
  const docRef = doc(db, 'posts', id);
  await updateDoc(docRef, payload);
}
