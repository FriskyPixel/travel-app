import "regenerator-runtime/runtime";

describe("Testing the getCoordinates functionality", () => {
  test("Testing the getCoordinates() function", () => {
    const getCoordinates = require("../src/server/server");
    expect(getCoordinates).toBeDefined();
  });
});

describe("Testing the getWeather functionality", () => {
  test("Testing the getWeather() function", () => {
    const getWeather = require("../src/server/server");
    expect(getWeather).toBeDefined();
  });
});

describe("Testing the getPicture functionality", () => {
  test("Testing the getPicture() function", () => {
    const getPicture = require("../src/server/server");
    expect(getPicture).toBeDefined();
  });
});
