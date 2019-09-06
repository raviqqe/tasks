import markdownParser from "prettier/parser-markdown";
import prettier from "prettier/standalone";

export interface IDocument {
  id: string;
  text: string; // in Markdown
}

export function formatDocument(document: IDocument): IDocument {
  return {
    ...document,
    text: prettier
      .format(document.text, { parser: "markdown", plugins: [markdownParser] })
      .trim()
      // https://github.com/prettier/prettier/issues/6213
      .replace(/\\*\$/g, "$")
  };
}

export function validateDocument(document: IDocument): void {
  if (!document.text) {
    throw new Error("document cannot be empty");
  }
}
