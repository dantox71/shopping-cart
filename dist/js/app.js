//DOM Variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// initialize cart array
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  const storage = new Storage();

  // products.getProducts().then(products => console.log(products));

  products.getProducts().then(products => {
    ui.displayProducts(products);
    Storage.saveProducts(products);
  });
});
