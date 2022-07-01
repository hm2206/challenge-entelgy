"use strict";

class Item extends HTMLElement {
  constructor() {
    super();
    this.user = {
      id: this.getAttribute("data-id"),
      first_name: this.getAttribute("data-first_name"),
      last_name: this.getAttribute("data-last_name"),
      email: this.getAttribute("data-email"),
      avatar: this.getAttribute("data-avatar"),
      counter: this.getAttribute("data-counter"),
    };
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.querySelector("#item-template");
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);
    this.render(shadowRoot);
  }

  render(shadowRoot = new ShadowRoot()) {
    const first_name = shadowRoot.querySelector("#first_name");
    const avatar = shadowRoot.querySelector("#avatar");
    const counter = shadowRoot.querySelector("#counter");
    const fullName = `${this.user.first_name} ${this.user.last_name}`;
    first_name.textContent = fullName;
    avatar.src = this.user.avatar;
    counter.textContent = `Usuario ${this.user.counter}`;
  }
}

customElements.define("item-template", Item);
