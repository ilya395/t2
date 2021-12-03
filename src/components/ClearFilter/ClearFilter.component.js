import { CLEAR_FILTER } from "../../constants";

export class ClearFilter {
  constructor(object) {
    this.workContainer = object.workContainer;
    this._clickHandler = this._clickHandler.bind(this);
  }
  _eventMaker(object) {
    const { node, data } = object;
    const event = new Event(CLEAR_FILTER, {
      bubbles: true,
    });
    event.data = data;
    node.dispatchEvent(event);
  }
  _clickHandler() {
    const target = document.querySelector(this.workContainer);
    this._eventMaker({
      node: target,
      data: {}
    });
  }
  init() {
    document.querySelector(this.workContainer).addEventListener("click", this._clickHandler);
  }
}