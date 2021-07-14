import "firebase/auth";
import firebase from "firebase/app";
import { IAuthenticationController } from "../../application/authentication-controller";
import { sleep } from "../../domain/utilities";

export class FirebaseAuthenticationController
  implements IAuthenticationController
{
  private signedIn: boolean | null = null;

  constructor() {
    firebase.auth().onAuthStateChanged((user: firebase.User | null): void => {
      this.signedIn = !!user;
    });
  }

  public async signIn(): Promise<void> {
    await firebase
      .auth()
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  public async signOut(): Promise<boolean> {
    await firebase.auth().signOut();
    return this.isSignedIn();
  }

  public async isSignedIn(): Promise<boolean> {
    while (this.signedIn === null) {
      await sleep(10);
    }

    return this.signedIn;
  }
}
