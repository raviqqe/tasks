import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { useStore } from "@nanostores/react";
import { useAsync } from "@raviqqe/react-hooks";
import type { JSX, ReactNode } from "react";
import {
  Links,
  type LinksFunction,
  Meta,
  type MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";
import { configuration } from "../configuration.json" with { type: "json" };
import { applicationInitializer } from "../main/application-initializer.js";
import { authenticationPresenter } from "../main/authentication-presenter.js";
import { Loader } from "./components/Loader.js";
import styles from "./root.module.css";

export const meta: MetaFunction = () => [
  {
    charSet: "utf-8",
  },
  {
    content: "width=device-width,initial-scale=1",
    name: "viewport",
  },
  {
    content: "en",
    httpEquiv: "content-language",
  },
  {
    content: configuration.title,
    property: "og:title",
  },
  {
    content: configuration.description,
    property: "og:description",
  },
  {
    content: "website",
    property: "og:type",
  },
  {
    content: `https://${configuration.domain}`,
    property: "og:url",
  },
  {
    content: `https://${configuration.domain}/icon.svg`,
    property: "og:image",
  },
  {
    content: "summary",
    name: "twitter:card",
  },
  {
    title: configuration.title,
  },
  {
    content: configuration.description,
    name: "description",
  },
];

export const links: LinksFunction = () => [
  {
    href: "/icon.svg",
    rel: "icon",
  },
  {
    href: "/manifest.json",
    rel: "manifest",
  },
];

export const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  const signedIn = useStore(authenticationPresenter.signedIn);
  useAsync(() => applicationInitializer.initialize(), []);
  const navigate = useNavigate();

  useAsync(async () => {
    if (typeof signedIn === "boolean") {
      await navigate(signedIn ? "/tasks" : "/");
    }
  }, [signedIn]);

  return (
    <html className={styles.root} lang="en">
      <head>
        <Meta />
        <Links />
        <script
          data-domain={configuration.domain}
          defer
          src="https://plausible.io/js/script.js"
        />
        <base target="_blank" />
      </head>
      <body className={styles.body}>
        {signedIn === null ? (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        ) : (
          children
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default (): JSX.Element => <Outlet />;
