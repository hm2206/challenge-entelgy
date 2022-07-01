"use strict";

class Modal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let shadowRoot = this.attachShadow({ mode: "open" });
    this.#template(shadowRoot);
    this.render();
    this.handleClose();
  }

  #template(shadowRoot = new ShadowRoot()) {
    const content = document.createElement("div");
    // styles
    const style = document.createElement("style");
    style.innerHTML = `@import "./src/assets/styles/modal.css"`;
    // content modal
    const contentModal = document.createElement("div");
    contentModal.className = "content-modal";
    // body modal
    const bodyModal = document.createElement("div");
    bodyModal.className = "body-modal";
    const close = document.createElement("span");
    close.className = "modal-close";
    close.textContent = "X";
    const result = document.createElement("div");
    bodyModal.appendChild(close);
    bodyModal.appendChild(result);
    contentModal.appendChild(bodyModal);
    // append
    content.appendChild(style);
    content.appendChild(contentModal);
    shadowRoot.appendChild(content);
    // export
    this._close = close;
    this._result = result;
  }

  getProps() {
    return {
      user: {
        id: this.getAttribute("data-id"),
        first_name: this.getAttribute("data-first_name"),
        last_name: this.getAttribute("data-last_name"),
        email: this.getAttribute("data-email"),
        avatar: this.getAttribute("data-avatar"),
        counter: this.getAttribute("data-counter"),
      },
    };
  }

  render() {
    const { user } = this.getProps();
    const item = document.createElement("item-component");
    Object.keys(user).forEach((attr) => {
      const value = user[attr];
      item.setAttribute(`data-${attr}`, value);
    });
    this._result.appendChild(item);
  }

  handleClose = () => {
    this._close.addEventListener("click", () => {
      this.remove();
    });
  };
}

customElements.define("modal-template", Modal);
