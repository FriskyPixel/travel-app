import { getDate, getData } from "../src/client/js/data";

describe("Testing the getDate functionality", () => {
  test("Testing getDate() function", () => {
    expect(getDate).toBeDefined();
  });
});

describe("Testing the getData functionality", () => {
  test("Testing getData() function", () => {
    expect(getData).toBeDefined();
  });
});
