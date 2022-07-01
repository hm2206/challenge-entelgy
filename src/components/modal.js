"use strict";

class Modal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let shadowRoot = this.attachShadow({ mode: "open" });
    this.#template(shadowRoot);
    this.#styles();
    this.render();
    this.handleClose();
  }

  #template(shadowRoot = new ShadowRoot()) {
    const content = document.createElement("div");
    // styles
    const style = document.createElement("style");
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
    this._style = style;
  }

  #styles() {
    this._style.innerHTML = `
      * {
        margin: 0px;
        padding: 0px;
        border: 0px;
      }
      
      .content-modal {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        backdrop-filter: blur(1.2px);
        left: 0px;
        top: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .body-modal {
        position: relative;
      }
      
      .modal-close {
        position: absolute;
        top: 10px;
        right: 10px;
        font-weight: bold;
        cursor: pointer;
        color: #455a64;
        padding: 0.5em;
      }
    `;
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
