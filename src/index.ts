import { ApplicationInitializer } from "./application/application-initializer";
import { CurrentProjectSwitcher } from "./application/current-project-switcher";
import { DoneTaskLister } from "./application/done-task-lister";
import { ProjectArchiver } from "./application/project-archiver";
import { ProjectCreator } from "./application/project-creator";
import { ProjectDeleter } from "./application/project-deleter";
import { ProjectUnarchiver } from "./application/project-unarchiver";
import { ProjectUpdater } from "./application/project-updater";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import { TodoTaskCompleter } from "./application/todo-task-completer";
import { TodoTaskCreator } from "./application/todo-task-creator";
import { TodoTaskDeleter } from "./application/todo-task-deleter";
import { TodoTaskLister } from "./application/todo-task-lister";
import { TodoTaskReorderer } from "./application/todo-task-reorderer";
import { TodoTaskUpdater } from "./application/todo-task-updater";
import configuration from "./configuration.json";
import { AlertMessagePresenter } from "./infrastructure/alert-message-presenter";
import { AuthenticationPresenter } from "./infrastructure/authentication-presenter";
import { BuiltinConfirmationController } from "./infrastructure/builtin-confirmation-controller";
import { DoneTaskPresenter } from "./infrastructure/done-task-presenter";
import { FirebaseAuthenticationController } from "./infrastructure/firebase/firebase-authentication-controller";
import { FirebaseInitializer } from "./infrastructure/firebase/firebase-initializer";
import { FirestoreDoneTaskRepository } from "./infrastructure/firebase/firestore-done-task-repository";
import { FirestoreProjectRepository } from "./infrastructure/firebase/firestore-project-repository";
import { FirestoreTodoTaskRepository } from "./infrastructure/firebase/firestore-todo-task-repository";
import { InfrastructureInitializer } from "./infrastructure/infrastructure-initializer";
import { LocalForageCurrentProjectRepository } from "./infrastructure/local-forage-current-project-repository";
import { ProjectPresenter } from "./infrastructure/project-presenter";
import { ReactRenderer } from "./infrastructure/react";
import { SentryErrorReporter } from "./infrastructure/sentry-error-reporter";
import { TodoTaskPresenter } from "./infrastructure/todo-task-presenter";

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

  const firebaseApp = await firebaseInitializer.initialize();
  const authenticationPresenter = new AuthenticationPresenter();
  const authenticationController = new FirebaseAuthenticationController(
    firebaseApp
  );
  const messagePresenter = new AlertMessagePresenter();
  const confirmationController = new BuiltinConfirmationController();
  const todoTaskRepository = new FirestoreTodoTaskRepository(firebaseApp);
  const doneTaskRepository = new FirestoreDoneTaskRepository(firebaseApp);
  const todoTaskPresenter = new TodoTaskPresenter();
  const doneTaskPresenter = new DoneTaskPresenter();
  const todoTaskDeleter = new TodoTaskDeleter(
    todoTaskRepository,
    todoTaskPresenter
  );
  const todoTaskLister = new TodoTaskLister(
    todoTaskRepository,
    todoTaskPresenter
  );
  const doneTaskLister = new DoneTaskLister(
    doneTaskRepository,
    doneTaskPresenter
  );
  const projectRepository = new FirestoreProjectRepository(firebaseApp);
  const projectPresenter = new ProjectPresenter();
  const currentProjectRepository = new LocalForageCurrentProjectRepository();
  const currentProjectSwitcher = new CurrentProjectSwitcher(
    currentProjectRepository,
    projectPresenter,
    todoTaskLister,
    doneTaskLister,
    todoTaskPresenter,
    doneTaskPresenter
  );
  const projectCreator = new ProjectCreator(
    currentProjectSwitcher,
    projectRepository,
    projectPresenter,
    messagePresenter
  );

  new ReactRenderer(
    element,
    [
      authenticationPresenter,
      doneTaskPresenter,
      projectPresenter,
      todoTaskPresenter,
    ],
    new ApplicationInitializer(
      authenticationController,
      authenticationPresenter,
      new InfrastructureInitializer(firebaseInitializer),
      projectCreator,
      projectRepository,
      projectPresenter,
      currentProjectSwitcher,
      currentProjectRepository
    ),
    new TodoTaskCreator(
      todoTaskRepository,
      todoTaskPresenter,
      messagePresenter
    ),
    new TodoTaskUpdater(
      todoTaskDeleter,
      todoTaskRepository,
      todoTaskPresenter,
      confirmationController
    ),
    new TodoTaskCompleter(
      todoTaskDeleter,
      doneTaskRepository,
      doneTaskPresenter
    ),
    new TodoTaskReorderer(todoTaskRepository, todoTaskPresenter),
    doneTaskLister,
    projectCreator,
    new ProjectArchiver(
      currentProjectSwitcher,
      projectRepository,
      projectPresenter,
      messagePresenter,
      confirmationController
    ),
    new ProjectUnarchiver(
      currentProjectSwitcher,
      projectRepository,
      projectPresenter
    ),
    new ProjectDeleter(
      projectRepository,
      projectPresenter,
      confirmationController
    ),
    new ProjectUpdater(projectRepository, projectPresenter, messagePresenter),
    currentProjectSwitcher,
    new SignInManager(authenticationController),
    new SignOutManager(authenticationController, authenticationPresenter),
    configuration.repositoryURL
  ).render();

  await navigator.serviceWorker.register("/service-worker.js");
}

main().catch((error) => errorReporter.report(error));
