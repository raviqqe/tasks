import { DocumentCreator } from "../document-creator";
import { IDocumentRepository } from "../document-repository";
import { IDocumentPresenter } from "../document-presenter";
import { IMessagePresenter } from "../message-presenter";

let documentRepository: jest.Mocked<IDocumentRepository>;
let documentPresenter: jest.Mocked<IDocumentPresenter>;
let messagePresenter: jest.Mocked<IMessagePresenter>;
let documentCreator: DocumentCreator;

beforeEach(() => {
  documentRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    update: jest.fn()
  };
  documentPresenter = ({
    presentNewDocument: jest.fn()
  } as unknown) as jest.Mocked<IDocumentPresenter>;
  messagePresenter = { present: jest.fn() };
  documentCreator = new DocumentCreator(
    documentRepository,
    documentPresenter,
    messagePresenter
  );
});

it("creates and persists a document", async () => {
  await documentCreator.create("foo");
  expect(documentRepository.create.mock.calls).toEqual([
    [{ id: expect.any(String), text: "foo" }]
  ]);
  expect(documentPresenter.presentNewDocument.mock.calls).toEqual([
    [{ id: expect.any(String), text: "foo" }]
  ]);
});

it("formats a document before creation", async () => {
  await documentCreator.create("\tfoo ");
  expect(documentRepository.create.mock.calls[0][0].text).toBe("foo");
});

it("validates a document before creation", async () => {
  await documentCreator.create("");
  expect(messagePresenter.present.mock.calls).toEqual([
    ["Document cannot be empty!"]
  ]);
});
