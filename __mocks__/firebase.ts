export function initializeApp() {
    return;
}

export function auth() {
    return {
        currentUser: { delete: () => undefined },
        onAuthStateChanged: () => undefined,
        signInWithPopup: () => undefined,
        signOut: () => undefined,
    };
}
