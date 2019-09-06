export class AlertMessagePresenter {
  public async present(message: string): Promise<void> {
    alert(message);
  }
}
