import React, { ReactNode } from "react";
import styled from "styled-components";

import { grey } from "../style/colors";

const SubInformation = styled.div`
  font-size: 0.95em;
  color: ${grey};
`;

export default ({ children }: { children?: ReactNode }) => (
  <SubInformation>{children}</SubInformation>
);
