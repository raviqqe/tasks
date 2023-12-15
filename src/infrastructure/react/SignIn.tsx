import { TextButton } from "./TextButton.js";

interface Props {
  signIn: () => void;
}

export const SignIn = ({ signIn }: Props): JSX.Element => (
  <TextButton onClick={signIn}>Sign in</TextButton>
);
