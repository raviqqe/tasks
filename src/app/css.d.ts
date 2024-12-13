declare module "*.css" {
  const classes: Record<string, string>;

  // eslint-disable-next-line import-x/no-default-export
  export default classes;
}
