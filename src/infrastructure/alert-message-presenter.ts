import { IMessagePresenter } from "../application/message-presenter.js";

export class AlertMessagePresenter implements IMessagePresenter {
  public present(message: string): void {
    alert(message);
  }
}
