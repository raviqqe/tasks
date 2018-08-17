import * as React from "react";

import MenuBox from "./MenuBox";
import MenuButton, { IProps } from "./MenuButton";

export default ({
  isSmallWindow,
  ...props
}: { isSmallWindow: boolean } & IProps) =>
  isSmallWindow ? <MenuButton {...props} /> : <MenuBox {...props} />;
