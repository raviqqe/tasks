import { FirebaseApp } from "firebase/app";
import {
  Auth,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { IAuthenticationController } from "../../application/authentication-controller";

export class FirebaseAuthenticationController
  implements IAuthenticationController
{
  private readonly auth: Auth;
  private signedIn: boolean | null = null;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.auth.onAuthStateChanged((user) => {
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
    if (this.signedIn === null) {
      this.signedIn = !!(await getRedirectResult(this.auth));
    }

    return this.signedIn;
  }
}
