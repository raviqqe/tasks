import classNames from "classnames";
import type { ButtonHTMLAttributes, JSX, ReactNode } from "react";
import styles from "./IconButton.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const IconButton = ({
  children,
  className,
  ...rest
}: Props): JSX.Element => (
  <button
    className={classNames(styles.root, className)}
    type="button"
    {...rest}
  >
    {children}
  </button>
);
