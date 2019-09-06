export interface IFileRepository {
  create(file: Blob): Promise<string>;
}
