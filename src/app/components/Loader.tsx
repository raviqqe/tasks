import type { JSX } from "react";
import { PulseLoader } from "react-spinners";

export const Loader = (): JSX.Element => (
  <PulseLoader color="var(--white)" style={{ display: "initial" }} />
);
