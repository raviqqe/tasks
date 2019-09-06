export interface IAuthenticationController {
  signIn(): Promise<void>;
  signOut(): Promise<boolean>;
  isSignedIn(): Promise<boolean>;
}
