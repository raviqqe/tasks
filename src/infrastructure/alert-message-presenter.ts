import { IMessagePresenter } from "../application/message-presenter";

export class AlertMessagePresenter implements IMessagePresenter {
  public present(message: string): void {
    alert(message);
  }
}
