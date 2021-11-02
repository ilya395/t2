export class FilterComponent {
  constructor(object) {
    this.workContainer = object.workContainer;
    this.manageElement = object.manageElement;
    this.state = false;
    this.inWorking = false;
    this._toggle = this._toggle.bind(this);
  }
  _toggle() {
    if (!this.inWorking) {
      const container = document.querySelector(this.workContainer);
      const animationEndHandler = () => {
        this.inWorking = false;
        container.removeEventListener("transitionend", animationEndHandler);
      }
      const animationStartHandler = () => {
        this.inWorking = true;
        container.addEventListener("transitionend", animationEndHandler);
        container.removeEventListener("transitionstart", animationStartHandler);
      }
      if (container) {

        container.addEventListener("transitionstart", animationStartHandler);

        this.state = !this.state;
        window.requestAnimationFrame(() => {
          return window.requestAnimationFrame(() => {
            container.classList.toggle("active");
          });
        });

      }
    } else {
      console.log(this.inWorking)
    }
  }
  init() {
    const toggleBtn = document.querySelector(this.manageElement);
    if (toggleBtn) {
      toggleBtn.addEventListener("click", this._toggle);
    }
  }
}