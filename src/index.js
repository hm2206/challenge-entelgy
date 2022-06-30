"use strict";

// lista de componetes
const components = ["app.js", "item.js", "modal.js"];

// importar componente
components.forEach((component) => {
  const script = document.createElement("script");
  script.src = `/src/components/${component}`;
  document.querySelector("head").appendChild(script);
});
