import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { AuthenticationStore } from "../mobx/authentication-store";
import { DocumentsStore } from "../mobx/documents-store";
import { IProps as ILandingProps, Landing } from "./Landing";
import { Home, IProps as IHomeProps } from "./Home";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

interface IProps extends Omit<IHomeProps, "documents">, ILandingProps {
  authenticationStore: AuthenticationStore;
  documentsStore: DocumentsStore;
  initialize: () => Promise<void>;
}

export const App = observer(
  ({
    authenticationStore: { signedIn },
    documentsStore: { documents },
    initialize,
    repositoryURL,
    signIn,
    signOut,
    ...props
  }: IProps) => {
    useAsync(initialize, []);

    return signedIn === null ? (
      <LoaderContainer>
        <PulseLoader color="white" />
      </LoaderContainer>
    ) : signedIn ? (
      <Home {...props} documents={documents} signOut={signOut} />
    ) : (
      <Landing repositoryURL={repositoryURL} signIn={signIn} />
    );
  }
);
