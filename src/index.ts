import { AlertMessagePresenter } from "./infrastructure/alert-message-presenter";
import { ApplicationInitializer } from "./application/application-initializer";
import { TodoTaskCreator } from "./application/todo-task-creator";
import { TodoTaskDeleter } from "./application/todo-task-deleter";
import { TodoTaskLister } from "./application/todo-task-lister";
import { TodoTaskUpdater } from "./application/todo-task-updater";
import { ProjectCreator } from "./application/project-creator";
import { FirebaseAuthenticationController } from "./infrastructure/firebase/firebase-authentication-controller";
import { FirestoreTodoTaskRepository } from "./infrastructure/firebase/firestore-todo-task-repository";
import { FirestoreDoneTaskRepository } from "./infrastructure/firebase/firestore-done-task-repository";
import { FirestoreProjectRepository } from "./infrastructure/firebase/firestore-project-repository";
import { FirebaseInitializer } from "./infrastructure/firebase/firebase-initializer";
import { InfrastructureInitializer } from "./infrastructure/infrastructure-initializer";
import { ReactRenderer } from "./infrastructure/react";
import { SentryErrorReporter } from "./infrastructure/sentry-error-reporter";
import { AuthenticationPresenter } from "./infrastructure/authentication-presenter";
import { TodoTaskPresenter } from "./infrastructure/todo-task-presenter";
import { ProjectPresenter } from "./infrastructure/project-presenter";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import configuration from "./configuration.json";
import { CurrentProjectSwitcher } from "./application/current-project-switcher";
import { LocalForageCurrentProjectRepository } from "./infrastructure/local-forage-current-project-repository";
import { DoneTaskLister } from "./application/done-task-lister";
import { DoneTaskPresenter } from "./infrastructure/done-task-presenter";
import { TodoTaskCompleter } from "./application/todo-task-completer";
import { TodoTaskReorderer } from "./application/todo-task-reorderer";
import { ProjectArchiver } from "./application/project-archiver";
import { ProjectUnarchiver } from "./application/project-unarchiver";
import { BuiltinConfirmationController } from "./infrastructure/builtin-confirmation-controller";
import { ProjectDeleter } from "./application/project-deleter";
import { FirestoreOldProjectRepository } from "./infrastructure/firebase/firestore-old-project-repository";
import { OldDataMigrator } from "./application/old-data-migrator";
import { ProjectUpdater } from "./application/project-updater";

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

  const authenticationPresenter = new AuthenticationPresenter();
  const authenticationController = new FirebaseAuthenticationController();
  const messagePresenter = new AlertMessagePresenter();
  const confirmationController = new BuiltinConfirmationController();
  const todoTaskRepository = new FirestoreTodoTaskRepository();
  const doneTaskRepository = new FirestoreDoneTaskRepository();
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
  const projectRepository = new FirestoreProjectRepository();
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
      todoTaskPresenter
    ],
    new ApplicationInitializer(
      authenticationController,
      authenticationPresenter,
      new InfrastructureInitializer(firebaseInitializer),
      projectCreator,
      projectRepository,
      projectPresenter,
      currentProjectSwitcher,
      currentProjectRepository,
      new OldDataMigrator(
        new FirestoreOldProjectRepository(),
        projectRepository,
        todoTaskRepository,
        doneTaskRepository
      )
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

main().catch(error => errorReporter.report(error));
