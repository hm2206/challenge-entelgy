"use strict";

class Item extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    this.#template(shadowRoot);
    this.#styles();
    this.render(shadowRoot);
  }

  #template(shadowRoot = new ShadowRoot()) {
    const content = document.createElement("div");
    // styles
    const style = document.createElement("style");
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
    this._style = style;
  }

  #styles() {
    this._style.innerHTML = `
      * {
        margin: 0px;
        padding: 0px;
        border: 0px;
      }
      
      .content-item {
        width: 500px;
        height: auto;
        background-color: #fff;
        border-radius: 0.2em;
        box-shadow: 0px 0px 20px -8px #000;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        padding: 2em 1em;
        margin: 0.5em;
        cursor: pointer;
      }
      
      .content-item.basic {
        width: 300px;
        box-shadow: 0px 0px 20px -8px #050ef9;
        transition: 0.2s ease-in-out;
      }
      
      .content-item.basic:hover {
        transition: all 0.25s ease-in;
        transform: scale(1.15);
      }
      
      .item-image {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 50%;
        margin: 0.5em;
        box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.5);
      }
      
      .basic .item-image {
        width: 100px;
        height: 100px;
      }
      
      .item-title {
        font-size: 16px;
        margin: 1em 0px;
        color: #37474f;
      }
      
      .item-email {
        color: #78909c;
        font-size: 13px;
        margin-top: -10px;
        margin-bottom: 1em;
      }
      
      .basic .item-email {
        display: none;
      }
      
      .item-button {
        color: #2196f3;
        font-weight: bold;
        background: #ffff;
        border: 2px solid #2196f3;
        padding: 0.7em 2em;
        border-radius: 0.3em;
        margin-top: 1em;
        box-shadow: 0px 10px 20px -10px #1565c0;
      }
      
      .basic .item-button {
        color: #fff;
        background: linear-gradient(
          60deg,
          rgba(28, 215, 233, 1) 0%,
          rgba(15, 161, 255, 1) 35%,
          rgba(33, 150, 243, 1) 100%
        );
        border: 0px;
      }
  
    `;
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
