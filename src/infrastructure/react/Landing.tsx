import { GoMarkGithub } from "react-icons/go/index.js";
import styled from "styled-components";
import { SignIn } from "./SignIn.js";
import { black, red, white } from "./style/colors.js";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    margin: 2rem;
  }
`;

const Title = styled.div`
  font-family: "Chelsea Market", sans-serif;
  font-size: 4em;
  font-weight: bold;
  text-shadow: 0.4em 0.4em 0.4em rgba(0, 0, 0, 0.1);
`;

const White = styled.span`
  color: ${white};
`;

const Red = styled.span`
  color: ${red};
`;

const GitHubLink = styled.a`
  font-size: 2.5rem;
  margin: 1.5rem;
  color: ${black};
  display: block;
  position: fixed;
  bottom: 0em;
  right: 0em;
  line-height: 0ex;
`;

export interface IProps {
  repositoryUrl: string;
  signIn: () => void;
}

export const Landing = ({ repositoryUrl, signIn }: IProps): JSX.Element => (
  <Container>
    <Title>
      <White>Be</White>
      <Red>Done</Red>
    </Title>
    <SignIn signIn={signIn} />
    <GitHubLink href={repositoryUrl} target="_blank">
      <GoMarkGithub />
    </GitHubLink>
  </Container>
);
