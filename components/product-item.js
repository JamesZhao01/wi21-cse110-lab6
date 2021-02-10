// product-item.js

class ProductItem extends HTMLElement {
  static get observedAttributes() { return ['src', 'title', 'price', 'add']; }

  constructor() {
    super();

    const styles = ".price { color: green; font-size: 1.8em; font-weight: bold; margin: 0; } .product { align-items: center; background-color: white; border-radius: 5px; display: grid; grid-template-areas: 'image' 'title' 'price' 'add'; grid-template-rows: 67% 11% 11% 11%; height: 450px; filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2)); margin: 0 30px 30px 0; padding: 10px 20px; width: 200px; } .product > button { background-color: rgb(255, 208, 0); border: none; border-radius: 5px; color: black; justify-self: center; max-height: 35px; padding: 8px 20px; transition: 0.1s ease all; } .product > button:hover { background-color: rgb(255, 166, 0); cursor: pointer; transition: 0.1s ease all; } .product > img { align-self: center; justify-self: center; width: 100%; } .title { font-size: 1.1em; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .title:hover { font-size: 1.1em; margin: 0; white-space: wrap; overflow: auto; text-overflow: unset; } ";

    const shadow = this.attachShadow({ mode: "open" });

    const li = document.createElement("li");
    li.setAttribute("class", "product");

    const img = document.createElement("img");
    img.setAttribute("src", null);
    img.setAttribute("alt", null);
    img.setAttribute("width", 200);

    const title = document.createElement("p");
    title.setAttribute("class", "title");
    title.innerText = "";

    const price = document.createElement("p");
    price.setAttribute("class", "price");
    price.innerText = "";

    const button = document.createElement("button");

    button.addEventListener("click", (e) => {
      const cartCount = document.querySelector("#cart-count");
      if (this.getAttribute("add") == "true") {
        cartCount.innerText = Number(cartCount.innerText) + 1;
        this.setAttribute("add", "false");
        if (!window.localStorage.getItem("cart")) {
          window.localStorage.setItem("cart", JSON.stringify([this.getAttribute("id")]));
        } else {
          window.localStorage.setItem("cart", JSON.stringify([...JSON.parse(window.localStorage.getItem("cart")), this.getAttribute("id")]))
        }
      } else {
        cartCount.innerText = Number(cartCount.innerText) - 1;
        let arr = JSON.parse(window.localStorage.getItem("cart"));
        let index = arr.indexOf(this.getAttribute("id"));
        console.log(arr, index);
        arr = [...arr.slice(0, index), ...arr.slice(index + 1)];
        console.log(arr);
        window.localStorage.setItem("cart", JSON.stringify(arr))
        this.setAttribute("add", "true");
      }

    })

    li.appendChild(img);
    li.appendChild(title);
    li.appendChild(price);
    li.appendChild(button);

    const style = document.createElement("style");
    style.textContent = styles;
    shadow.append(li, style);

  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src":
        this.shadowRoot.querySelector("img").setAttribute("src", newValue);
        break;
      case "title":
        this.shadowRoot.querySelector("img").setAttribute("alt", newValue);
        this.shadowRoot.querySelector("p.title").innerText = newValue;
        break;
      case "price":
        this.shadowRoot.querySelector("p.price").innerText = Number(newValue).toFixed(2);
        break;
      case "add":
        let button = this.shadowRoot.querySelector("button");
        if (newValue == "true") {
          button.innerText = "Add to Cart";
          button.setAttribute("onclick", "alert('Removed from Cart!')");
        } else {
          button.innerText = "Remove from Cart";
          button.setAttribute("onclick", "alert('Added to Cart!')");
        }
        break;
    }
  }
}

customElements.define('product-item', ProductItem);