"use strict";

class Modal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.querySelector("#modal-template");
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);
  }
}

customElements.define("modal-template", Modal);
