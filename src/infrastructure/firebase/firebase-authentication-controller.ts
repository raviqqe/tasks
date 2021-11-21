import { FirebaseApp } from "firebase/app";
import { IAuthenticationController } from "../../application/authentication-controller";
import { sleep } from "../../domain/utilities";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

export class FirebaseAuthenticationController
  implements IAuthenticationController
{
  private readonly auth: Auth;
  private signedIn: boolean | null = null;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.auth.onAuthStateChanged((user): void => {
      this.signedIn = !!user;
    });
  }

  public async signIn(): Promise<void> {
    await signInWithRedirect(this.auth, new GoogleAuthProvider());
  }

  public async signOut(): Promise<boolean> {
    await this.auth.signOut();
    return this.isSignedIn();
  }

  public async isSignedIn(): Promise<boolean> {
    while (this.signedIn === null) {
      await sleep(10);
    }

    return this.signedIn;
  }
}
