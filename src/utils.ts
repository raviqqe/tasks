import config from "./config";

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export function createRootElement(): HTMLDivElement {
  const root = document.createElement("div");

  root.id = config.rootId;
  (document.documentElement as HTMLElement).appendChild(root);

  return root;
}
