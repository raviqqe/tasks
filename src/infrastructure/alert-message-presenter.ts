import type { MessagePresenter } from "../application/message-presenter.js";

export class AlertMessagePresenter implements MessagePresenter {
  public present(message: string): void {
    alert(message);
  }
}
