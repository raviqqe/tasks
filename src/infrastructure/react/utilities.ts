export type InsertFilesFunction = (
  text: string,
  position: number,
  files: File[]
) => Promise<string>;
