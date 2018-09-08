import React, { ReactNode } from "react";
import styled from "styled-components";

import { lightGrey } from "../style/colors";

const SettingsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  border-bottom: 1px solid ${lightGrey};
`;

export default ({
  children,
  label
}: {
  children?: ReactNode;
  label: string;
}) => (
  <SettingsItem>
    {label}
    {children}
  </SettingsItem>
);
