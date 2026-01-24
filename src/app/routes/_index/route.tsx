import type { JSX } from "react";
import { FaGithub } from "react-icons/fa";
import configuration from "../../../configuration.json" with { type: "json" };
import { signInManager } from "../../../main/sign-in-manager.js";
import { SignIn } from "../../components/SignIn.js";
import styles from "./route.module.css";

export default (): JSX.Element => (
  <div className={styles.root}>
    <div className={styles.title}>
      <span className={styles.white}>Be</span>
      <span className={styles.red}>Done</span>
    </div>
    <SignIn signIn={() => signInManager.signIn()} />
    <a
      className={styles.githubLink}
      href={configuration.repositoryUrl}
      target="_blank"
    >
      <FaGithub />
    </a>
  </div>
);
