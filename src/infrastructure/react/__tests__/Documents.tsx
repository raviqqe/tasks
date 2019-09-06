import { create } from "react-test-renderer";
import React from "react";
import { Documents } from "../Documents";

it("renders", () => {
  expect(
    create(
      <Documents
        documents={[{ id: "id", text: "text" }]}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        updateDocument={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with no documents", () => {
  expect(
    create(
      <Documents
        documents={[]}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        updateDocument={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with documents not loaded yet", () => {
  expect(
    create(
      <Documents
        documents={null}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        updateDocument={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
