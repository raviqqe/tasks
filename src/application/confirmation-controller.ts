export interface IConfirmationController {
  confirm(message: string): Promise<boolean>;
}
