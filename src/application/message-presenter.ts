export interface IMessagePresenter {
  present(message: string): Promise<void>;
}
