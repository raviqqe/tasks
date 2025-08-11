import { beforeEach, expect, it } from "vitest";
import type { Project } from "../domain/project.js";
import { CurrentProjectSwitcher } from "./current-project-switcher.js";
import { MockManager } from "./test/mock-manager.js";

const dummyProject: Project = { archived: false, id: "projectId", name: "" };

let mockManager: MockManager;
let currentProjectSwitcher: CurrentProjectSwitcher;

beforeEach(() => {
  mockManager = new MockManager();

  currentProjectSwitcher = new CurrentProjectSwitcher(
    mockManager.currentProjectRepository,
    mockManager.projectPresenter,
  );
});

it("switches a current project", async () => {
  await currentProjectSwitcher.switch(dummyProject);

  expect(mockManager.projectPresenter.presentCurrentProject.mock.calls).toEqual(
    [[dummyProject]],
  );
  expect(mockManager.currentProjectRepository.set.mock.calls).toEqual([
    [dummyProject.id],
  ]);
});
