export interface AuthenticationController {
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  isSignedIn(): Promise<boolean>;
}
