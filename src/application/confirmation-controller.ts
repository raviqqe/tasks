export interface ConfirmationController {
  confirm(message: string): Promise<boolean>;
}
