import { h } from "/js/src/index.js";

/**
 * Page content
 * @param {h} content
 * @param {Function} onclick
 * @return {vnode}
 */
const Button = (content, onclick, href = "#") =>
  h(
    "a.btn.btn-primary.p2.flex-row.justify-center",
    {
      onclick: onclick,
      href: href,
    },
    content
  );

export default Button;
