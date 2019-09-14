import { AlertMessagePresenter } from "./infrastructure/alert-message-presenter";
import { ApplicationInitializer } from "./application/application-initializer";
import { BuiltinConfirmationController } from "./infrastructure/builtin-confirmation-controller";
import { TaskCreator } from "./application/task-creator";
import { TaskDeleter } from "./application/task-deleter";
import { TaskLister } from "./application/task-lister";
import { TaskUpdater } from "./application/task-updater";
import { ProjectCreator } from "./application/project-creator";
import { FirebaseAuthenticationController } from "./infrastructure/firebase/firebase-authentication-controller";
import { FirebaseTaskRepository } from "./infrastructure/firebase/firebase-task-repository";
import { FirebaseProjectRepository } from "./infrastructure/firebase/firebase-project-repository";
import { FirebaseInitializer } from "./infrastructure/firebase/firebase-initializer";
import { InfrastructureInitializer } from "./infrastructure/infrastructure-initializer";
import { ReactRenderer } from "./infrastructure/react";
import { SentryErrorReporter } from "./infrastructure/sentry-error-reporter";
import { AuthenticationStore } from "./infrastructure/mobx/authentication-store";
import { MobxAuthenticationPresenter } from "./infrastructure/mobx/mobx-authentication-presenter";
import { TasksStore } from "./infrastructure/mobx/tasks-store";
import { MobxTaskPresenter } from "./infrastructure/mobx/mobx-task-presenter";
import { ProjectsStore } from "./infrastructure/mobx/projects-store";
import { MobxProjectPresenter } from "./infrastructure/mobx/mobx-project-presenter";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
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
  const taskRepository = new FirebaseTaskRepository();
  const messagePresenter = new AlertMessagePresenter();
  const confirmationController = new BuiltinConfirmationController();
  const tasksStore = new TasksStore();
  const taskPresenter = new MobxTaskPresenter(tasksStore);
  const projectRepository = new FirebaseProjectRepository();
  const projectsStore = new ProjectsStore();
  const projectPresenter = new MobxProjectPresenter(projectsStore);
  const projectCreator = new ProjectCreator(
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
      projectPresenter
    ),
    new TaskCreator(taskRepository, taskPresenter, messagePresenter),
    new TaskLister(taskRepository, taskPresenter),
    new TaskUpdater(
      new TaskDeleter(taskRepository, taskPresenter, confirmationController),
      taskRepository,
      taskPresenter,
      messagePresenter
    ),
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
