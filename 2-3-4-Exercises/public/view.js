import { h, switchCase } from "/js/src/index.js";
import HomeContent from "./home/homePage.js";
import AboutContent from "./about/aboutPage.js";

/**
 * Main view layout
 * @return {vnode} application view to be drawn according to model
 */
export default (model) => [
  h(".flex-column.absolute-fill", [header(model), content(model)]),
];

/**
 * Top header of the page
 * @param {Model} model
 * @return {vnode}
 */
const header = (model) => {
  const { router } = model;
  const { params } = router;
  return h(
    ".p2.shadow-level2.level2.success",
    {
      style: "display: flex; justify-content: center",
    },
    `Welcome to ${params.page}`
  );
};

/**
 * Page content
 * @param {Model} model
 * @return {vnode}
 */
const content = (model) => {
  const page = model.router.params.page;
  return switchCase(page, {
    home: HomeContent,
    about: AboutContent,
  })(model);
};
