import React from "react";
import ReactMarkdown from "react-markdown";
import styled, { css } from "styled-components";

const Container = styled.div`
  cursor: text;
  overflow-x: auto;

  > :first-child {
    margin-top: 0em;
  }

  > :last-child {
    margin-bottom: 0em;
  }

  * {
    word-wrap: break-word;
  }

  ${[1, 2, 3, 4, 5, 6].map(
    level => css`
      h${level} {
        font-size: 1em;

        &::before {
          content: "${"#".repeat(level)} ";
        }
      }
    `
  )};

  a {
    color: salmon;

    &:visited {
      color: salmon;
    }
  }

  blockquote {
    color: dimgrey;
  }

  img {
    cursor: pointer;
    max-width: 100%;
  }

  pre {
    overflow-x: auto;
  }

  pre,
  *:not(pre) > code {
    background: dimgrey;
    border-radius: 0.2rem;
    color: white;
    font-size: 0.95em;
    padding: 0.4em;
  }

  *:not(pre) > code {
    line-height: 2.5em;
  }

  table {
    border-collapse: collapse;
  }

  table,
  td,
  th {
    border: 1px solid grey;
  }

  td,
  th {
    padding: 0.4em 0.6em;
  }
`;

const Image = (props: { src: string }) => (
  <img
    onClick={event => {
      const parent = event.currentTarget.parentElement;

      if (parent && parent.tagName === "A") {
        return;
      }

      window.open(props.src, "_blank");
    }}
    {...props}
  />
);

interface IProps {
  children: string;
}

export const Markdown = ({ children }: IProps) => (
  <Container>
    <ReactMarkdown source={children} renderers={{ image: Image }} />
  </Container>
);
