import * as React from "react";

import MenuBox from "./MenuBox";
import MenuButton, { IProps } from "./MenuButton";

export default ({ windowSmall, ...props }: { windowSmall: boolean } & IProps) =>
  windowSmall ? <MenuButton {...props} /> : <MenuBox {...props} />;
