const assert = require("assert");

describe("Application Service", function () {
  const applicationService = require("../lib/applicationService.js");

  it("Checks if application service is correctly initialized != undefined", function () {
    assert.ok(applicationService);
  });

  it("Checks if getInfo returns expected JSON", function () {
    assert.deepEqual(applicationService.getInfo(), {
      data: {
        header1: ["some data"],
        header2: ["same data", "some data"],
        hader3: ["some data1", "some data2", "some data 3"],
      },
    });
  });
});
