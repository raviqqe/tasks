import { AlertMessagePresenter } from "./infrastructure/alert-message-presenter";
import { ApplicationInitializer } from "./application/application-initializer";
import { TodoTaskCreator } from "./application/todo-task-creator";
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
import { AuthenticationStore } from "./infrastructure/mobx/authentication-store";
import { MobxAuthenticationPresenter } from "./infrastructure/mobx/mobx-authentication-presenter";
import { TasksStore } from "./infrastructure/mobx/tasks-store";
import { MobxTodoTaskPresenter } from "./infrastructure/mobx/mobx-todo-task-presenter";
import { ProjectsStore } from "./infrastructure/mobx/projects-store";
import { MobxProjectPresenter } from "./infrastructure/mobx/mobx-project-presenter";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import configuration from "./configuration.json";
import { CurrentProjectSwitcher } from "./application/current-project-switcher";
import { LocalForageCurrentProjectRepository } from "./infrastructure/local-forage-current-project-repository";
import { DoneTaskLister } from "./application/done-task-lister";
import { MobxDoneTaskPresenter } from "./infrastructure/mobx/mobx-done-task-presenter";
import { TodoTaskCompleter } from "./application/todo-task-completer";
import { TodoTaskReorderer } from "./application/todo-task-reorderer";
import { ProjectArchiver } from "./application/project-archiver";

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
  const messagePresenter = new AlertMessagePresenter();
  const tasksStore = new TasksStore();
  const todoTaskRepository = new FirestoreTodoTaskRepository();
  const doneTaskRepository = new FirestoreDoneTaskRepository();
  const todoTaskPresenter = new MobxTodoTaskPresenter(tasksStore);
  const doneTaskPresenter = new MobxDoneTaskPresenter(tasksStore);
  const todoTaskLister = new TodoTaskLister(
    todoTaskRepository,
    todoTaskPresenter
  );
  const doneTaskLister = new DoneTaskLister(
    doneTaskRepository,
    doneTaskPresenter
  );
  const projectRepository = new FirestoreProjectRepository();
  const projectsStore = new ProjectsStore();
  const projectPresenter = new MobxProjectPresenter(projectsStore);
  const currentProjectRepository = new LocalForageCurrentProjectRepository();
  const currentProjectSwitcher = new CurrentProjectSwitcher(
    currentProjectRepository,
    projectPresenter,
    todoTaskLister,
    doneTaskLister
  );
  const projectCreator = new ProjectCreator(
    currentProjectSwitcher,
    projectRepository,
    projectPresenter,
    messagePresenter
  );

  new ReactRenderer(
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
      todoTaskRepository,
      todoTaskPresenter,
      messagePresenter
    ),
    new TodoTaskCompleter(
      todoTaskRepository,
      doneTaskRepository,
      todoTaskPresenter,
      doneTaskPresenter
    ),
    new TodoTaskReorderer(todoTaskRepository, todoTaskPresenter),
    doneTaskLister,
    projectCreator,
    new ProjectArchiver(
      currentProjectSwitcher,
      projectRepository,
      projectPresenter,
      messagePresenter
    ),
    currentProjectSwitcher,
    new SignInManager(authenticationController),
    new SignOutManager(authenticationController, authenticationPresenter),
    authenticationStore,
    projectsStore,
    tasksStore,
    configuration.repositoryURL
  ).render(element);

  // Disable default behavior on drop events.
  window.ondragover = (event: DragEvent) => event.preventDefault();
  window.ondrop = (event: DragEvent) => event.preventDefault();

  await navigator.serviceWorker.register("/service-worker.js");
}

main().catch(error => errorReporter.report(error));
