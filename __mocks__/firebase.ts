export function initializeApp() {
  return;
}

export function auth() {
  return {
    currentUser: { delete: () => undefined },
    onAuthStateChanged: () => undefined,
    signInWithPopup: () => undefined,
    signOut: () => undefined
  };
}

function collection() {
  return { doc, onSnapshot: () => undefined };
}

function doc() {
  return {
    collection,
    delete: () => undefined,
    onSnapshot: () => undefined,
    set: () => undefined
  };
}

export function firestore() {
  return {
    collection,
    enablePersistence: () => undefined,
    settings: () => undefined
  };
}
