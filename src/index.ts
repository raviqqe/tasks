import { AlertMessagePresenter } from "./infrastructure/alert-message-presenter";
import { ApplicationInitializer } from "./application/application-initializer";
import { BuiltinConfirmationController } from "./infrastructure/builtin-confirmation-controller";
import { DocumentCreator } from "./application/document-creator";
import { DocumentDeleter } from "./application/document-deleter";
import { DocumentLister } from "./application/document-lister";
import { DocumentUpdater } from "./application/document-updater";
import { FirebaseAuthenticationController } from "./infrastructure/firebase/firebase-authentication-controller";
import { FirebaseDocumentRepository } from "./infrastructure/firebase/firebase-document-repository";
import { FirebaseInitializer } from "./infrastructure/firebase/firebase-initializer";
import { FirebaseStorageFileRepository } from "./infrastructure/firebase/firebase-storage-file-repository";
import { InfrastructureInitializer } from "./infrastructure/infrastructure-initializer";
import { ReactRenderer } from "./infrastructure/react";
import { SentryErrorReporter } from "./infrastructure/sentry-error-reporter";
import { AuthenticationStore } from "./infrastructure/mobx/authentication-store";
import { MobxAuthenticationPresenter } from "./infrastructure/mobx/mobx-authentication-presenter";
import { DocumentsStore } from "./infrastructure/mobx/documents-store";
import { MobxDocumentPresenter } from "./infrastructure/mobx/mobx-document-presenter";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import { TextFileInserter } from "./application/text-file-inserter";
import configuration from "./configuration.json";

// Instantiate this at the very beginning to initialize Firebase's default app.
const firebaseInitializer = new FirebaseInitializer(
  configuration.firebase.projectId,
  configuration.firebase.apiKey
);
const errorReporter = new SentryErrorReporter(configuration.sentry.dsn);

async function main() {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  const authenticationStore = new AuthenticationStore();
  const authenticationPresenter = new MobxAuthenticationPresenter(
    authenticationStore
  );
  const authenticationController = new FirebaseAuthenticationController();
  const documentRepository = new FirebaseDocumentRepository();
  const messagePresenter = new AlertMessagePresenter();
  const confirmationController = new BuiltinConfirmationController();
  const documentsStore = new DocumentsStore();
  const documentPresenter = new MobxDocumentPresenter(documentsStore);

  new ReactRenderer(
    new ApplicationInitializer(
      authenticationController,
      authenticationPresenter,
      new InfrastructureInitializer(firebaseInitializer)
    ),
    new DocumentCreator(
      documentRepository,
      documentPresenter,
      messagePresenter
    ),
    new DocumentLister(documentRepository, documentPresenter),
    new DocumentUpdater(
      new DocumentDeleter(
        documentRepository,
        documentPresenter,
        confirmationController
      ),
      documentRepository,
      documentPresenter,
      messagePresenter
    ),
    new SignInManager(authenticationController),
    new SignOutManager(authenticationController, authenticationPresenter),
    new TextFileInserter(new FirebaseStorageFileRepository()),
    authenticationStore,
    documentsStore,
    configuration.repositoryURL
  ).render(element);

  // Disable default behavior on drop events.
  window.ondragover = (event: DragEvent) => event.preventDefault();
  window.ondrop = (event: DragEvent) => event.preventDefault();

  await navigator.serviceWorker.register("/service-worker.js");
}

main().catch(error => errorReporter.report(error));
