import classNames from "classnames";
import type { ComponentProps, JSX } from "react";
import { Button } from "./Button.js";
import styles from "./TextButton.module.css";

type Props = ComponentProps<typeof Button>;

export const TextButton = ({ className, ...rest }: Props): JSX.Element => (
  <Button className={classNames(styles.root, className)} {...rest} />
);
