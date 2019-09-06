import {
  IDocument,
  formatDocument,
  validateDocument
} from "../domain/document";
import { formatErrorMessage } from "../domain/error";
import { DocumentDeleter } from "./document-deleter";
import { IDocumentRepository } from "./document-repository";
import { IDocumentPresenter } from "./document-presenter";
import { IMessagePresenter } from "./message-presenter";

export class DocumentUpdater {
  constructor(
    private readonly documentDeleter: DocumentDeleter,
    private readonly documentRepository: IDocumentRepository,
    private readonly documentPresenter: IDocumentPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async update(
    originalDocument: IDocument,
    text: string
  ): Promise<void> {
    const document = formatDocument({ ...originalDocument, text });

    if (!document.text) {
      await this.documentDeleter.delete(document.id);
      return;
    }

    try {
      validateDocument(document);
    } catch (error) {
      await this.messagePresenter.present(formatErrorMessage(error));
      return;
    }

    await this.documentRepository.update(document);
    this.documentPresenter.presentUpdatedDocument(document);
  }
}
