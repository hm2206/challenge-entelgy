"use strict";

class App extends HTMLElement {
  constructor() {
    super();
    this.users = [];
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    this.#template(shadowRoot);
    this.saveLocalstore();
    this.render();
  }

  #template(shadowRoot = new ShadowRoot()) {
    const content = document.createElement("div");
    // styles
    const style = document.createElement("style");
    style.innerHTML = `@import "./src/assets/styles/app.css"`;
    // content title
    const contentTitle = document.createElement("div");
    contentTitle.className = "content-title";
    const image = document.createElement("img");
    image.src = "./src/assets/img/logo.png";
    image.className = "image";
    const title = document.createElement("h1");
    title.textContent = "Lista de Usuarios";
    title.className = "title";
    contentTitle.appendChild(image);
    contentTitle.appendChild(title);
    // content body
    const contentBody = document.createElement("div");
    contentBody.className = "content-body";
    const userList = document.createElement("div");
    userList.className = "body-list";
    contentBody.appendChild(userList);
    // append
    content.appendChild(style);
    content.appendChild(contentTitle);
    content.appendChild(contentBody);
    shadowRoot.appendChild(content);
    // export
    this._userList = userList;
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

  render() {
    this.users.forEach((user, index) => {
      const item = document.createElement("item-component");
      item.setAttribute("data-id", user.id);
      item.setAttribute("data-first_name", user.first_name);
      item.setAttribute("data-last_name", user.last_name);
      item.setAttribute("data-email", user.email);
      item.setAttribute("data-avatar", user.avatar);
      item.setAttribute("data-counter", index + 1);
      item.setAttribute("data-basic", true);
      this._userList.appendChild(item);
    });
  }
}

customElements.define("app-component", App);
