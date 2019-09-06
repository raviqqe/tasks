import React from "react";
import styled from "styled-components";
import { CreateDocument } from "./CreateDocument";
import { Documents, IProps as IDocumentsProps } from "./Documents";
import { SignOut } from "./SignOut";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 85ex;
  max-width: 100%;
  margin: auto;

  > :first-child {
    flex: 1;
  }
`;

const CreateDocumentContainer = styled.div`
  position: relative;

  * {
    z-index: 1;
  }
`;

const CreateDocumentBackground = styled.div`
  background: darkkhaki;
  position: absolute;
  top: 0;
  left: -100vw;
  width: 200vw;
  height: 100%;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.3);
  z-index: 0;
`;

const SignOutContainer = styled.div`
  position: fixed;
  top: 0.5em;
  right: 0.5em;
`;

export interface IProps extends IDocumentsProps {
  createDocument: (text: string) => Promise<void>;
  signOut: () => void;
}

export const Home = ({
  createDocument,
  documents,
  insertFiles,
  listDocuments,
  listMoreDocuments,
  signOut,
  updateDocument
}: IProps) => (
  <Container>
    <Documents
      documents={documents}
      insertFiles={insertFiles}
      listDocuments={listDocuments}
      listMoreDocuments={listMoreDocuments}
      updateDocument={updateDocument}
    />
    <CreateDocumentContainer>
      <CreateDocument
        createDocument={createDocument}
        insertFiles={insertFiles}
      />
      <CreateDocumentBackground />
    </CreateDocumentContainer>
    <SignOutContainer>
      <SignOut signOut={signOut} />
    </SignOutContainer>
  </Container>
);
