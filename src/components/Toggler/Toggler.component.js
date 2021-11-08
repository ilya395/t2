export class TogglerComponent {
  constructor(object) {
    this.workContainer = object.workContainer;
    this.inWorking = false;
    this._clickHandler = this._clickHandler.bind(this);
    this._viewController = this._viewController.bind(this);
  }
  _viewController(view) {
    const container = document.querySelector(this.workContainer);
    if (container) {
      if (view === "rows") {
        const transitionStartHadler = () => {
          container.classList.remove("blocks");
          container.classList.add("rows");
          container.addEventListener("transitionend", transitionStartHadler);

          const callbackHellTransitionStartHadler = () => {
            this.inWorking = false;
            container.removeEventListener("transitionend", callbackHellTransitionStartHadler);
          }
          container.addEventListener("transitionend", callbackHellTransitionStartHadler);
          container.classList.add("active");
        }
        container.addEventListener("transitionend", transitionStartHadler);
        this.inWorking = true;
        container.classList.remove("active");

      } else {
        const transitionStartHadler = () => {
          container.classList.remove("rows");
          container.classList.add("blocks");
          container.addEventListener("transitionend", transitionStartHadler);

          const callbackHellTransitionStartHadler = () => {
            this.inWorking = false;
            container.removeEventListener("transitionend", callbackHellTransitionStartHadler);
          }
          container.addEventListener("transitionend", callbackHellTransitionStartHadler);
          container.classList.add("active");
        }
        container.addEventListener("transitionend", transitionStartHadler);
        this.inWorking = true;
        container.classList.remove("active");
      }
    }
  }
  _clickHandler(event) {
    const target = event.target;
    if (target.dataset.view && !this.inWorking) {
      if (!target.classList.contains("active")) {
        const allManageButtons = document.querySelectorAll("[data-view]");
        allManageButtons.forEach(item => {
          if (item.dataset.view === target.dataset.view) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });

        this._viewController(target.dataset.view);
      }
    } console.log("alert")
  }
  init() {
    document.addEventListener("click", this._clickHandler);
  }
}