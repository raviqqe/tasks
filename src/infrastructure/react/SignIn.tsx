import React from "react";
import { TextButton } from "./TextButton";

interface IProps {
  signIn: () => void;
}

export const SignIn = ({ signIn }: IProps) => (
  <TextButton onClick={signIn}>Sign in</TextButton>
);
