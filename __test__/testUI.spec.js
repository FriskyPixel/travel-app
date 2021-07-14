/**
 * @jest-environment jsdom
 */

import { paintUI, paintError, removeError } from "../src/client/js/UI";

describe("Testing the paintUI functionality", () => {
  test("Testing paintUI() function", () => {
    expect(paintUI).toBeDefined();
  });
});

describe("Testing the paintError functionality", () => {
  test("Testing paintError() function", () => {
    expect(paintError).toBeDefined();
  });
});

describe("Testing the removeError functionality", () => {
  test("Testing removeError() function", () => {
    expect(removeError).toBeDefined();
  });
});
