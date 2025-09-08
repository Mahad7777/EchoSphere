import { c as create_ssr_component } from "../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<html lang="en"><head data-svelte-h="svelte-16uio4q"><meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Scalable Chat App</title> <link rel="stylesheet" href="./css/app.css"></head> <body>${slots.default ? slots.default({}) : ``}</body></html>`;
});
export {
  Layout as default
};
