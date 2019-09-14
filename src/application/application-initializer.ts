import { IAuthenticationController } from "./authentication-controller";
import { IAuthenticationPresenter } from "./authentication-presenter";
import { IInfrastructureInitializer } from "./infrastructure-initializer";
import { ProjectCreator } from "./project-creator";
import { IProjectRepository } from "./project-repository";
import { IProjectPresenter } from "./project-presenter";

export class ApplicationInitializer {
  constructor(
    private readonly authenticationController: IAuthenticationController,
    private readonly authenticationPresenter: IAuthenticationPresenter,
    private readonly infrastructureInitializer: IInfrastructureInitializer,
    private readonly projectCreator: ProjectCreator,
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter
  ) {}

  public async initialize(): Promise<void> {
    await this.infrastructureInitializer.initialize();
    const signedIn: boolean = await this.authenticationController.isSignedIn();
    this.authenticationPresenter.presentSignedIn(signedIn);

    if (!signedIn) {
      return;
    }

    const projects = await this.projectRepository.list();

    if (projects.length === 0) {
      await this.projectCreator.create("default");
    } else {
      this.projectPresenter.presentCurrentProject(projects[0]);
      this.projectPresenter.presentProjects(projects);
    }
  }
}
