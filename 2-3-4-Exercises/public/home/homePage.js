import { h } from "/js/src/index.js";
import Button from "../components/Button/Button.js";
import { iconPerson } from "/js/src/icons.js";

/**
 * Page content
 * @return {vnode}
 */
let usernameData = "";
const content = (model) => {
  return h("", [
    Button("About", (e) => model.router.handleLinkEvent(e), "?page=about"),
    Button(
      ["Get username", iconPerson()],
      () => (usernameData = "HI: " + model.homeModel.userName)
    ),
    h("p", usernameData),
  ]);
};

export default content;
