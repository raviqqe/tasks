import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { styled } from "@linaria/react";
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
import { configuration } from "../configuration.js";
import { applicationInitializer } from "../main/application-initializer.js";
import { authenticationPresenter } from "../main/authentication-presenter.js";
import { Loader } from "./components/Loader.js";
import { black, green, red } from "./style.js";

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

const Body = styled.body`
  --black: ${black};
  --red: ${red};

  background: ${green};
  margin: 0;
  padding: 0;
  color: ${black};
  font-family: Roboto, sans-serif;
  line-height: 1.4;
  font-size: 16px;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const LoaderContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
`;

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
    <html lang="en">
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
      <Body>
        {signedIn === null ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          children
        )}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </html>
  );
};

export default (): JSX.Element => <Outlet />;
