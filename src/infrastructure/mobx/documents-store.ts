import { action, observable } from "mobx";
import { IDocument } from "../../domain/document";

export class DocumentsStore {
  @observable public documents: IDocument[] | null = null;

  @action
  public setDocuments(documents: IDocument[]): void {
    this.documents = documents;
  }

  @action
  public appendDocuments(documents: IDocument[]): void {
    if (!this.documents) {
      throw new Error("documents not loaded");
    }

    this.documents = [...this.documents, ...documents];
  }

  @action
  public prependDocument(document: IDocument): void {
    if (!this.documents) {
      throw new Error("documents not loaded");
    }

    this.documents = [document, ...this.documents];
  }

  @action
  public updateDocument(updatedDocument: IDocument): void {
    if (!this.documents) {
      throw new Error("documents not loaded");
    }

    this.documents = this.documents.map(document =>
      document.id === updatedDocument.id ? updatedDocument : document
    );
  }

  @action
  public deleteDocument(documentID: string): void {
    if (!this.documents) {
      throw new Error("documents not loaded");
    }

    this.documents = this.documents.filter(
      document => document.id !== documentID
    );
  }
}
