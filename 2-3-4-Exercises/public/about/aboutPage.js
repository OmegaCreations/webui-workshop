import { h } from "/js/src/index.js";
import Button from "../components/Button/Button.js";
import { iconBook } from "/js/src/icons.js";

/**
 * Maps row data into <td> components
 * @return {vnode}
 */
const mappedRow = (rowData) => {
  const td = rowData.map((data) => h("td", data));
  return h("tr", td);
};

/**
 * Page content
 * @return {vnode}
 */
let jsonData = {};
const content = (model) => {
  const tableData = [];

  // get haeders for table component
  const headers = Object.keys(jsonData);
  tableData.push(headers);

  // get rows from json
  const maxRows = Math.max(...Object.values(jsonData).map((arr) => arr.length));
  for (let i = 0; i < maxRows; i++) {
    const row = headers.map((key) => jsonData[key][i] || "no data");
    tableData.push(row);
  }

  // return
  return h("", [
    Button("Home", (e) => model.router.handleLinkEvent(e), "?page=home"),
    Button(
      ["Get data", iconBook()],
      () => (jsonData = model.aboutModel.getDetails())
    ),
    h("table.table", [
      h("thead", [
        h(
          "tr",
          headers.map((header) => h("th", header))
        ),
      ]),
      h(
        "tbody",
        tableData.slice(1).map((rowData) => mappedRow(rowData))
      ),
    ]),
  ]);
};

export default content;
