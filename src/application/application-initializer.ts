import { IAuthenticationController } from "./authentication-controller";
import { IAuthenticationPresenter } from "./authentication-presenter";
import { IInfrastructureInitializer } from "./infrastructure-initializer";
import { ProjectCreator } from "./project-creator";
import { IProjectRepository } from "./project-repository";
import { IProjectPresenter } from "./project-presenter";
import { ICurrentProjectRepository } from "./current-project-repository";
import { CurrentProjectSwitcher } from "./current-project-switcher";
import { OldDataMigrator } from "./old-data-migrator";

export class ApplicationInitializer {
  constructor(
    private readonly authenticationController: IAuthenticationController,
    private readonly authenticationPresenter: IAuthenticationPresenter,
    private readonly infrastructureInitializer: IInfrastructureInitializer,
    private readonly projectCreator: ProjectCreator,
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
    private readonly currentProjectRepository: ICurrentProjectRepository,
    private readonly oldDataMigrator: OldDataMigrator
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
      await this.projectCreator.create("main");
      return;
    }

    const currentProjectID = await this.currentProjectRepository.get();
    await this.currentProjectSwitcher.switch(
      projects.find(project => project.id === currentProjectID) || projects[0]
    );
    this.projectPresenter.presentProjects(projects);
    this.projectPresenter.presentArchivedProjects(
      await this.projectRepository.listArchived()
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.oldDataMigrator.migrate();
  }
}
