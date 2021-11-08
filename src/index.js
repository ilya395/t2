import "./styles/fonts.css";
import "./style.scss";

import { FilterComponent, TogglerComponent  } from "./components";

window.addEventListener("load", () => {
  const newFilter = new FilterComponent({
    workContainer: ".filter-container",
    manageElement: ".open-filter-btn__button",
  });
  newFilter.init();

  const toggler = new TogglerComponent ({
    workContainer: "main.main"
  });
  toggler.init();
});