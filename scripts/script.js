// Script.js
const styles = ""

window.addEventListener('DOMContentLoaded', async () => {
  let shopData = undefined;
  if (window.localStorage.getItem("data") == undefined) {
    await fetch("https://fakestoreapi.com/products").
      then(response => response.json()).
      then(data => {
        shopData = data;
        window.localStorage.setItem("data", JSON.stringify(shopData));
      });
  } else {
    shopData = JSON.parse(window.localStorage.getItem("data"));
  }
  console.log("done");

  let cart = null;
  if (window.localStorage.getItem("cart")) {
    cart = JSON.parse(window.localStorage.getItem("cart"));
  } else {
    cart = [];
  }
  for (let item of shopData) {
    let shopItem = document.createElement("product-item");
    shopItem.setAttribute("src", item.image);
    shopItem.setAttribute("title", item.title);
    shopItem.setAttribute("price", item.price);
    shopItem.setAttribute("add", !cart.includes(String(item.id)));
    shopItem.setAttribute("id", item.id);
    document.querySelector("ul").appendChild(shopItem);
  }

  document.querySelector("span#cart-count").innerHTML = cart.length;


});