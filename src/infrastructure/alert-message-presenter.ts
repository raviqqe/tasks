import type { MessagePresenter } from "../application/message-presenter.js";

export class AlertMessagePresenter implements MessagePresenter {
  present(message: string): void {
    alert(message);
  }
}
