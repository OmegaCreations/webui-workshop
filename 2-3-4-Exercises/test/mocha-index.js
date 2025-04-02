const puppeteer = require("puppeteer");
const { spawn } = require("child_process");
const assert = require("assert");

let browser, page, server;

before(async function () {
  this.timeout(10000);
  server = spawn("node", ["index.js"], { stdio: "inherit" });
  await new Promise((resolve) => setTimeout(resolve, 3000));
  browser = await puppeteer.launch({ headless: "new" });
  page = await browser.newPage();
  await new Promise((resolve) => setTimeout(resolve, 2000));
});

after(async function () {
  await browser.close();
  server.kill("SIGTERM");
});

describe("Application Tests", function () {
  describe("Basic Functionality", function () {
    it("should connect successfully to the application", async function () {
      await page.goto("http://localhost:8080");
      const title = await page.title();
      assert.ok(title.length > 0, "Page should have title");
    });
  });

  describe("Navigation Tests", function () {
    it("should correctly navigate between pages", async function () {
      await page.goto("http://localhost:8080");
      await Promise.all([
        page.waitForNavigation(),
        page.click('button:has-text("About")'),
      ]);
      const aboutUrl = await page.url();
      assert.match(aboutUrl, /page=about/, "Should navigate to about page");
    });
  });

  describe("Button Tests", function () {
    before(async function () {
      await page.goto("http://localhost:8080");
    });

    it("should have all required buttons", async function () {
      const buttons = await page.$$eval("button", (buttons) =>
        buttons.map((b) => b.textContent.trim())
      );
      assert.deepStrictEqual(
        buttons.sort(),
        ["Home", "About", "Get data"].sort(),
        "Should have all main buttons"
      );
    });

    it("buttons should be clickable and functional", async function () {
      await page.click('button:has-text("Home")');
      let url = await page.url();
      assert.match(url, /page=home/, "Home button should navigate to home");

      await page.click('button:has-text("About")');
      url = await page.url();
      assert.match(url, /page=about/, "About button should navigate to about");
    });

    it("Get Data button should fetch and display data", async function () {
      await page.goto("http://localhost:8080?page=about");

      await page.setRequestInterception(true);
      page.on("request", (request) => {
        if (request.url().includes("/api/info")) {
          request.respond({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              data: {
                header1: ["test data"],
                header2: ["test data 2"],
              },
            }),
          });
        } else {
          request.continue();
        }
      });

      await page.click('button:has-text("Get data")');

      await page.waitForSelector("table");
      const tableData = await page.$$eval("table tbody tr", (rows) =>
        rows.map((row) => row.textContent.trim())
      );

      assert.isAbove(tableData.length, 0, "Table should display data");
    });
  });
});
