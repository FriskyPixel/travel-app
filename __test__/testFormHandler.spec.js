/**
 * @jest-environment jsdom
 */

import { formHandler } from "../src/client/js/formHandler";

describe("Testing the formHandler functionality", () => {
  test("Testing formHandler() function", () => {
    expect(formHandler).toBeDefined();
  });
});
