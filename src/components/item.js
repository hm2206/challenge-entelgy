"use strict";

class Item extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    this.#template(shadowRoot);
    this.render(shadowRoot);
  }

  #template(shadowRoot = new ShadowRoot()) {
    const content = document.createElement("div");
    // styles
    const style = document.createElement("style");
    style.innerHTML = `@import "./src/assets/styles/item.css"`;
    // content title
    const contentItem = document.createElement("div");
    contentItem.className = "content-item";
    const image = document.createElement("img");
    image.src = "./src/assets/img/logo.png";
    image.className = "item-image";
    const title = document.createElement("h4");
    title.className = "item-title";
    const email = document.createElement("span");
    email.className = "item-email";
    const btnCounter = document.createElement("button");
    btnCounter.className = "item-button";
    contentItem.appendChild(image);
    contentItem.appendChild(title);
    contentItem.appendChild(email);
    contentItem.appendChild(btnCounter);
    // append
    content.appendChild(style);
    content.appendChild(contentItem);
    shadowRoot.appendChild(content);
    // exports
    this._content = content;
    this._contentItem = contentItem;
    this._image = image;
    this._title = title;
    this._email = email;
    this._btnCounter = btnCounter;
  }

  getProps() {
    return {
      basic: this.getAttribute("data-basic"),
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

  handleClick(shadowRoot = new ShadowRoot()) {
    const { user } = this.getProps();
    this._contentItem.addEventListener("click", () => {
      const modal = document.createElement("modal-template");
      Object.keys(user).forEach((attr) => {
        const value = user[attr];
        modal.setAttribute(`data-${attr}`, value);
      });
      shadowRoot.appendChild(modal);
    });
  }

  render(shadowRoot = new ShadowRoot()) {
    const { user, basic } = this.getProps();
    const fullName = `${user.first_name} ${user.last_name}`;
    this._title.textContent = fullName;
    this._email.textContent = user.email;
    this._image.src = user.avatar;
    this._btnCounter.textContent = `Usuario ${user.counter}`;
    // validar basic
    if (basic) {
      this._contentItem.className += ` basic`;
      this.handleClick(shadowRoot);
    }
  }
}

customElements.define("item-component", Item);
