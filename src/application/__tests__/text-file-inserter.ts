import { TextFileInserter } from "../text-file-inserter";

const dummyFileURL: string = "https://foo.com/bar";

let createMock: jest.Mock;
let inserter: TextFileInserter;

beforeEach(() => {
  createMock = jest.fn(async () => dummyFileURL);
  inserter = new TextFileInserter({ create: createMock });
});

it("inserts an image into a document", async () => {
  expect(
    await inserter.insert("foobar", 3, [{ type: "image/png" } as File])
  ).toBe(`foo![](${dummyFileURL})bar`);
});

it("inserts multiple images into a document", async () => {
  expect(
    await inserter.insert("foobar", 3, [
      { type: "image/png" } as File,
      { type: "image/png" } as File
    ])
  ).toBe(`foo![](${dummyFileURL}) ![](${dummyFileURL})bar`);
});

it("inserts a text file into a document", async () => {
  expect(
    await inserter.insert("foobar", 3, [
      { name: "foo", type: "text/plain" } as File
    ])
  ).toBe(`foo[foo](${dummyFileURL})bar`);
});
