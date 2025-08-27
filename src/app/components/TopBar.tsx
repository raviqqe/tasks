import { styled } from "@linaria/react";
import type { JSX } from "react";
import { signOutManager } from "../../main/sign-out-manager.js";
import { boxShadow, red } from "../style.js";
import { CurrentProject } from "./CurrentProject.js";
import { SignOut } from "./SignOut.js";

const Container = styled.div`
  ${boxShadow}
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: ${red};
  width: 100%;
`;

const SignOutContainer = styled.div`
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
`;

export const TopBar = (): JSX.Element => (
  <Container>
    <CurrentProject />
    <SignOutContainer>
      <SignOut signOut={() => signOutManager.signOut()} />
    </SignOutContainer>
  </Container>
);
