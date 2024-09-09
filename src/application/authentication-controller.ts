export interface AuthenticationController {
  isSignedIn(): Promise<boolean>;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
}
