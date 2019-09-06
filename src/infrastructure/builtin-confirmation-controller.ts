export class BuiltinConfirmationController {
  public async confirm(message: string): Promise<boolean> {
    return window.confirm(message);
  }
}
