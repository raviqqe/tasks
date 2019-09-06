import { IInfrastructureInitializer } from "../application/infrastructure-initializer";
import { FirebaseInitializer } from "./firebase/firebase-initializer";

export class InfrastructureInitializer implements IInfrastructureInitializer {
  constructor(private readonly firebaseInitializer: FirebaseInitializer) {}

  public async initialize(): Promise<void> {
    await this.firebaseInitializer.initialize();
  }
}
