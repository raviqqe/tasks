import { IDocument } from "../domain/document";

export interface IDocumentPresenter {
  presentDocuments(documents: IDocument[]): void;
  presentMoreDocuments(documents: IDocument[]): void;
  presentNewDocument(document: IDocument): void;
  presentUpdatedDocument(document: IDocument): void;
  presentDeletedDocument(documentID: string): void;
}
