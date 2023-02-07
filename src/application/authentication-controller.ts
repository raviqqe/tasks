export interface IAuthenticationController {
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  isSignedIn(): Promise<boolean>;
}
