import { DocumentDeleter } from "../document-deleter";
import { IDocumentRepository } from "../document-repository";
import { IDocumentPresenter } from "../document-presenter";
import { IConfirmationController } from "../confirmation-controller";

let documentRepository: jest.Mocked<IDocumentRepository>;
let documentPresenter: jest.Mocked<IDocumentPresenter>;
let confirmationController: jest.Mocked<IConfirmationController>;
let documentDeleter: DocumentDeleter;

beforeEach(() => {
  documentRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    update: jest.fn()
  };
  documentPresenter = ({
    presentDeletedDocument: jest.fn()
  } as unknown) as jest.Mocked<IDocumentPresenter>;
  confirmationController = { confirm: jest.fn() };
  documentDeleter = new DocumentDeleter(
    documentRepository,
    documentPresenter,
    confirmationController
  );
});

it("deletes a document after confirmation", async () => {
  confirmationController.confirm.mockResolvedValue(true);
  await documentDeleter.delete("foo");
  expect(documentRepository.delete.mock.calls).toEqual([["foo"]]);
  expect(documentPresenter.presentDeletedDocument.mock.calls).toEqual([
    ["foo"]
  ]);
});

it("does not delete any document if it is not confirmed", async () => {
  confirmationController.confirm.mockResolvedValue(false);
  await documentDeleter.delete("foo");
  expect(documentRepository.delete).toBeCalledTimes(0);
  expect(documentPresenter.presentDeletedDocument).toBeCalledTimes(0);
});
