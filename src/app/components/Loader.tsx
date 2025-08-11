import type { JSX } from "react";
import { PulseLoader } from "react-spinners";
import { white } from "../style.js";

export const Loader = (): JSX.Element => (
  <PulseLoader color={white} style={{ display: "initial" }} />
);
