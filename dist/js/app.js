//Create contentful client
const client = contentful.createClient({
  //This is the space ID. A space is like a project folder in Contentful terms
  space: "0ibc39uonltz",
  //This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "Y6b7ARFI81cpkq2mw1rKu0Uk69Itz20GgGzZZ9VJnew"
});

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

// cart
let cart = [];
// buttons
let buttonsDOM = [];

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  //setup App
  ui.setupAPP();

  products
    .getProducts()
    .then(products => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
    })
    .then(() => ui.cartLogic());
});
