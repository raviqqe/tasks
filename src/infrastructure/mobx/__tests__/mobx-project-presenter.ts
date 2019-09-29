import { MobxProjectPresenter } from "../mobx-project-presenter";
import { ProjectsStore } from "../projects-store";
import { IProject } from "../../../domain/project";

const dummyProject: IProject = { archived: false, id: "", name: "" };

let store: ProjectsStore;
let presenter: MobxProjectPresenter;

beforeEach(() => {
  store = new ProjectsStore();
  presenter = new MobxProjectPresenter(store);
});

it("presents sorted projects", () => {
  presenter.presentProjects([
    { ...dummyProject, name: "B" },
    { ...dummyProject, name: "a" }
  ]);

  expect(store.projects).toEqual([
    { ...dummyProject, name: "a" },
    { ...dummyProject, name: "B" }
  ]);
});

it("presents sorted archived projects", () => {
  presenter.presentArchivedProjects([
    { ...dummyProject, name: "B" },
    { ...dummyProject, name: "a" }
  ]);

  expect(store.archivedProjects).toEqual([
    { ...dummyProject, name: "a" },
    { ...dummyProject, name: "B" }
  ]);
});
