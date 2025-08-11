import { type RenderResult, render } from "@testing-library/react";
import type { JSX } from "react";
import { createRoutesStub } from "react-router";

export const renderRouter = (element: JSX.Element): RenderResult => {
  const Component = createRoutesStub([
    {
      // biome-ignore lint/style/useNamingConvention: External API
      Component: () => element,
      path: "/",
    },
  ]);

  return render(<Component />);
};
