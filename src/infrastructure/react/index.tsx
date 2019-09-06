import { render } from "react-dom";
import React from "react";
import { ApplicationInitializer } from "../../application/application-initializer";
import { DocumentCreator } from "../../application/document-creator";
import { DocumentLister } from "../../application/document-lister";
import { DocumentUpdater } from "../../application/document-updater";
import { IDocument } from "../../domain/document";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { TextFileInserter } from "../../application/text-file-inserter";
import { AuthenticationStore } from "../mobx/authentication-store";
import { DocumentsStore } from "../mobx/documents-store";
import { GlobalStyle } from "./style";
import { App } from "./App";

export class ReactRenderer {
  constructor(
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly documentCreator: DocumentCreator,
    private readonly documentLister: DocumentLister,
    private readonly documentUpdater: DocumentUpdater,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly textFileInserter: TextFileInserter,
    private readonly authenticationStore: AuthenticationStore,
    private readonly documentsStore: DocumentsStore,
    private readonly repositoryURL: string
  ) {}

  public render(element: HTMLElement): void {
    render(
      <>
        <App
          authenticationStore={this.authenticationStore}
          documentsStore={this.documentsStore}
          createDocument={(text: string) => this.documentCreator.create(text)}
          initialize={() => this.applicationInitializer.initialize()}
          insertFiles={(
            text: string,
            position: number,
            files: File[]
          ): Promise<string> =>
            this.textFileInserter.insert(text, position, files)
          }
          listDocuments={() => this.documentLister.list()}
          listMoreDocuments={() => this.documentLister.listMore()}
          repositoryURL={this.repositoryURL}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
          updateDocument={(document: IDocument, text: string) =>
            this.documentUpdater.update(document, text)
          }
        />
        <GlobalStyle />
      </>,
      element
    );
  }
}
