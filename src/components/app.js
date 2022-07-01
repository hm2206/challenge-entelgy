"use strict";

class App extends HTMLElement {
  constructor() {
    super();
    this.users = [];
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.querySelector("#app-template");
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);
    this.saveLocalstore();
    this.render(shadowRoot);
  }

  async getUser(page) {
    await fetch(`https://reqres.in/api/users?page=${page}`)
      .then((resData) => resData.json())
      .then(({ data }) => this.users.push(...data));
  }

  async saveLocalstore() {
    const data = JSON.parse(localStorage.getItem("dataUsers") || "null");
    if (data) {
      this.users = data;
      return;
    }
    // fetch data
    await this.getUser(1);
    await this.getUser(2);
    // add data localstorage
    localStorage.setItem("dataUsers", JSON.stringify(this.users));
  }

  render(shadowRoot = new ShadowRoot()) {
    const list = shadowRoot.querySelector("#user-list");
    this.users.forEach((user, index) => {
      const item = document.createElement("item-template");
      item.setAttribute("data-id", user.id);
      item.setAttribute("data-first_name", user.first_name);
      item.setAttribute("data-last_name", user.last_name);
      item.setAttribute("data-email", user.email);
      item.setAttribute("data-avatar", user.avatar);
      item.setAttribute("data-counter", index + 1);
      list.append(item);
    });
  }
}

customElements.define("app-template", App);
