import { create } from "react-test-renderer";
import React from "react";
import { UpdateDocument } from "../UpdateDocument";

it("renders", () => {
  expect(
    create(
      <UpdateDocument
        document={{ id: "id", text: "text" }}
        insertFiles={async () => "url"}
        onUpdate={() => undefined}
        updateDocument={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
