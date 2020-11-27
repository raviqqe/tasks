import { TextButton } from "./TextButton";

interface IProps {
  signIn: () => void;
}

export const SignIn = ({ signIn }: IProps): JSX.Element => (
  <TextButton onClick={signIn}>Sign in</TextButton>
);
