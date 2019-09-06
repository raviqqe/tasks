import { ApplicationInitializer } from "../../../application/application-initializer";
import { DocumentCreator } from "../../../application/document-creator";
import { DocumentLister } from "../../../application/document-lister";
import { DocumentUpdater } from "../../../application/document-updater";
import { SignInManager } from "../../../application/sign-in-manager";
import { SignOutManager } from "../../../application/sign-out-manager";
import { TextFileInserter } from "../../../application/text-file-inserter";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { DocumentsStore } from "../../mobx/documents-store";
import { ReactRenderer } from "..";

it("renders", () => {
  new ReactRenderer(
    {} as ApplicationInitializer,
    {} as DocumentCreator,
    {} as DocumentLister,
    {} as DocumentUpdater,
    {} as SignInManager,
    {} as SignOutManager,
    {} as TextFileInserter,
    new AuthenticationStore(),
    new DocumentsStore(),
    "url"
  ).render(document.createElement("div"));
});
