import { ApplicationInitializer } from "./application/application-initializer.js";
import { CurrentProjectInitializer } from "./application/current-project-initializer.js";
import { CurrentProjectSwitcher } from "./application/current-project-switcher.js";
import { DoneTaskLister } from "./application/done-task-lister.js";
import { ProjectArchiver } from "./application/project-archiver.js";
import { ProjectCreator } from "./application/project-creator.js";
import { ProjectDeleter } from "./application/project-deleter.js";
import { ProjectUnarchiver } from "./application/project-unarchiver.js";
import { ProjectUpdater } from "./application/project-updater.js";
import { SignInManager } from "./application/sign-in-manager.js";
import { SignOutManager } from "./application/sign-out-manager.js";
import { TodoTaskCompleter } from "./application/todo-task-completer.js";
import { TodoTaskCreator } from "./application/todo-task-creator.js";
import { TodoTaskDeleter } from "./application/todo-task-deleter.js";
import { TodoTaskLister } from "./application/todo-task-lister.js";
import { TodoTaskReorderer } from "./application/todo-task-reorderer.js";
import { TodoTaskUpdater } from "./application/todo-task-updater.js";
import configuration from "./configuration.json";
import { AlertMessagePresenter } from "./infrastructure/alert-message-presenter.js";
import { AuthenticationPresenter } from "./infrastructure/authentication-presenter.js";
import { BuiltinConfirmationController } from "./infrastructure/builtin-confirmation-controller.js";
import { DoneTaskPresenter } from "./infrastructure/done-task-presenter.js";
import { FirebaseAuthenticationController } from "./infrastructure/firebase/firebase-authentication-controller.js";
import { FirebaseInitializer } from "./infrastructure/firebase/firebase-initializer.js";
import { FirestoreDoneTaskRepository } from "./infrastructure/firebase/firestore-done-task-repository.js";
import { FirestoreProjectRepository } from "./infrastructure/firebase/firestore-project-repository.js";
import { FirestoreTodoTaskRepository } from "./infrastructure/firebase/firestore-todo-task-repository.js";
import { LocalForageCurrentProjectRepository } from "./infrastructure/local-forage-current-project-repository.js";
import { ProjectPresenter } from "./infrastructure/project-presenter.js";
import { ReactRenderer } from "./infrastructure/react/index.js";
import { SentryErrorReporter } from "./infrastructure/sentry-error-reporter.js";
import { TodoTaskPresenter } from "./infrastructure/todo-task-presenter.js";

// Instantiate this at the very beginning to initialize Firebase's default app.
const firebaseInitializer = new FirebaseInitializer(configuration.firebase);
const errorReporter = new SentryErrorReporter(configuration.sentry.dsn);

const main = async () => {
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
      authenticationPresenter
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
    new CurrentProjectInitializer(
      projectCreator,
      projectRepository,
      projectPresenter,
      currentProjectSwitcher,
      currentProjectRepository
    ),
    currentProjectSwitcher,
    new SignInManager(authenticationController, authenticationPresenter),
    new SignOutManager(authenticationController, authenticationPresenter),
    configuration.repositoryUrl
  ).render();
};

main().catch((error: Error) => errorReporter.report(error));
