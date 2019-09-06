import { DocumentLister } from "../document-lister";
import { IDocumentRepository } from "../document-repository";
import { IDocumentPresenter } from "../document-presenter";
import { IDocument } from "../../domain/document";

const dummyDocument: IDocument = { id: "", text: "" };

let documentRepository: jest.Mocked<IDocumentRepository>;
let documentPresenter: jest.Mocked<IDocumentPresenter>;
let documentLister: DocumentLister;

beforeEach(() => {
  documentRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(async function*(_: number) {
      yield [dummyDocument];
      yield [dummyDocument];
    }),
    update: jest.fn()
  };
  documentPresenter = ({
    presentDocuments: jest.fn(),
    presentMoreDocuments: jest.fn()
  } as unknown) as jest.Mocked<IDocumentPresenter>;
  documentLister = new DocumentLister(documentRepository, documentPresenter);
});

it("lists documents", async () => {
  await documentLister.list();
  expect(documentPresenter.presentDocuments.mock.calls).toEqual([
    [[{ id: "", text: "" }]]
  ]);
});

it("lists no documents", async () => {
  documentRepository.list = jest.fn(async function*(_: number) {});
  await documentLister.list();
  expect(documentPresenter.presentDocuments.mock.calls).toEqual([[[]]]);
});

it("lists more documents", async () => {
  await documentLister.list();
  await documentLister.listMore();
  expect(documentPresenter.presentMoreDocuments.mock.calls).toEqual([
    [[{ id: "", text: "" }]]
  ]);
});

it("lists no more documents", async () => {
  documentRepository.list = jest.fn(async function*(_: number) {});
  await documentLister.list();
  await documentLister.listMore();
  expect(documentPresenter.presentMoreDocuments).toBeCalledTimes(0);
});

it("throws an error if it tries to list more documents before listing initial ones", async () => {
  await expect(documentLister.listMore()).rejects.toThrowError();
});
