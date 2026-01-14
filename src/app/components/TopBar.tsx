import type { JSX } from "react";
import { signOutManager } from "../../main/sign-out-manager.js";
import { CurrentProject } from "./CurrentProject.js";
import { SignOut } from "./SignOut.js";
import styles from "./TopBar.module.css";

export const TopBar = (): JSX.Element => (
  <div className={styles.root}>
    <CurrentProject />
    <div className={styles.signOut}>
      <SignOut signOut={() => signOutManager.signOut()} />
    </div>
  </div>
);
