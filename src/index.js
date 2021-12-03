// import "./styles/fonts.css";
// (async () => {
//   if (process.env.NODE_ENV === "production") {
//     const s = await import("./styles/fonts.css");
//     // s();
//   }
// })();
import "./style.scss";

import { ClearFilter, FilterComponent, TogglerComponent  } from "./components";


window.addEventListener("load", () => {
  const newFilter = new FilterComponent({
    workContainer: ".filter-container",
    manageElement: "#open-filter",
  });
  newFilter.init();

  const toggler = new TogglerComponent ({
    workContainer: "main.main"
  });
  toggler.init();

  const clearFilterButton = new ClearFilter({
    workContainer: "#clear-filter"
  });
  clearFilterButton.init();
});