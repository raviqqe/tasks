export interface IInfrastructureInitializer {
  initialize(): Promise<void>;
}
