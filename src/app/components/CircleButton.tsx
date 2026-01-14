import classNames from "classnames";
import type { ComponentProps, JSX } from "react";
import { Button } from "./Button.js";
import styles from "./CircleButton.module.css";

type Props = ComponentProps<typeof Button>;

export const CircleButton = ({ className, ...rest }: Props): JSX.Element => (
  <Button className={classNames(styles.root, className)} {...rest} />
);
