import classNames from "classnames";
import type { ButtonHTMLAttributes, JSX } from "react";
import styles from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
}

export const Button = ({
  secondary,
  className,
  ...rest
}: Props): JSX.Element => (
  <button
    className={classNames(
      styles.root,
      secondary && styles.secondary,
      className,
    )}
    {...rest}
  />
);
