import configurations from "@raviqqe/eslint-config";

export default [
  ...configurations,
  {
    files: ["src/app/{root.tsx,routes.ts,routes/**/*.ts{,x}}"],
    rules: {
      "import-x/no-anonymous-default-export": "off",
      "import-x/no-default-export": "off",
      "react/display-name": "off",
    },
  },
];
