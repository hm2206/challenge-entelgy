"use strict";

class App extends HTMLElement {
  constructor() {
    super();
    this.users = [];
  }

  async connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    this.#template(shadowRoot);
    this.#styles();
    await this.saveLocalstore();
    this.render();
  }

  #template(shadowRoot = new ShadowRoot()) {
    const content = document.createElement("div");
    // styles
    const style = document.createElement("style");
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
    this._style = style;
  }

  #styles() {
    this._style.innerHTML = `
      * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
      }
      
      .content-title {
        width: 100%;
        background: white;
        text-align: center;
        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .content-title .image {
        width: 50px;
        height: 50px;
        object-fit: contain;
        margin-right: 0.5em;
        border-radius: 50%;
      }
      
      .content-title .title {
        font-size: 24px;
        color: #1f2667;
      }
      
      .content-body {
        margin: auto auto;
        max-width: 1300px;
        padding: 2em 1em;
        position: relative;
      }
      
      .body-list {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
      }
    `;
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
