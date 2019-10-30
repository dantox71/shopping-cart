//UI class is responsible for displaying products
class UI {
  displayProducts(products) {
    let result = '';

    products.forEach(product => {
      result += `
         <article class="product">
          <div class="img-container">
            <img
              src='${product.image}'
              alt="product"
              class="product-img"
            />
                <button class="bag-btn" data-id=${product.id}>
              Add To Cart
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
      
      `;
    });

    productsDOM.innerHTML = result;
  }

  getBagButtons() {
    const bagButtons = [...document.querySelectorAll('.bag-btn')]; //spread items
    buttonsDOM = bagButtons;
    bagButtons.forEach(button => {
      let id = button.dataset.id;
      //Check if item is already in cart
      let inCart = cart.find(item => item.id === id);
      if (inCart) {
        button.innerText = 'In Cart';
        button.disabled = true;
      }

      button.addEventListener('click', e => {
        e.target.innerText = 'In Cart';
        e.target.disabled = true;
        //get product from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };

        //Clow alert after adding item to cart
        this.showAlert(`${cartItem.title} has been added to the cart`);

        //add product to the cart
        cart = [...cart, cartItem];
        //save cart in local storage
        Storage.saveCart(cart);
        //set cart values
        this.setCartValues(cart);
        //display cart item
        this.addCartItem(cartItem);
        //show the cart
        // this.showCart();
      });
    });
  }

  setCartValues(cart) {
    let tempTotal = 0; //total price to pay
    let itemsTotal = 0; //total amount of items in cart

    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });

    cartTotal.innerText = parseFloat(tempTotal).toFixed(2);

    cartItems.innerText = itemsTotal;
  }

  addCartItem(item) {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `

      <img src="${item.image}" alt="Product">
      <div>
        <h4>${item.title}</h4>
        <h5>${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>remove</span>
      </div>

      <div class="amount-container">
        <i class="fas fa-plus" data-id="${item.id}"></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-minus" data-id=${item.id}></i>
      </div>
    `;

    //Append new added item to cartContent
    cartContent.appendChild(div);
  }

  showAlert(message) {
    const div = document.createElement('div');
    div.classList.add('alert');
    div.appendChild(document.createTextNode(message));

    productsDOM.insertAdjacentElement('beforebegin', div);

    //Remove alert after 3 sec
    setTimeout(this.removeAlert, 2000);
  }

  removeAlert() {
    const alert = document.querySelector('.alert');

    if (alert) {
      alert.remove();
    }
  }

  setupAPP() {
    cart = Storage.getCart(); //Get items from localStorage
    this.setCartValues(cart);
    this.populateCart(cart);

    //Show cart after clicking on cart button
    cartBtn.addEventListener('click', this.showCart);

    closeCartBtn.addEventListener('click', this.hideCart);
  }

  populateCart(cart) {
    cart.forEach(item => this.addCartItem(item));
  }

  showCart() {
    cartDOM.classList.add('showCart');
    cartOverlay.classList.add('showCartOverlay');
  }

  hideCart() {
    cartDOM.classList.remove('showCart');
    cartOverlay.classList.remove('showCartOverlay');
  }

  cartLogic() {
    //clear cart button
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
      this.showAlert('Cart has been cleared');
    });

    //cart functionality
    cartContent.addEventListener('click', e => {
      if (e.target.classList.contains('remove-item')) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        let cartItem = { ...Storage.getProduct(id) };
        this.showAlert(`${cartItem.title} has been removed from the cart`);
        removeItem.parentElement.parentElement.remove();

        this.removeItem(id);
      } else if (event.target.classList.contains('fa-plus')) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);

        tempItem.amount = tempItem.amount + 1;

        Storage.saveCart(cart);

        this.setCartValues(cart);

        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains('fa-minus')) {
        let subtractAmount = event.target;
        let id = subtractAmount.dataset.id;

        let tempItem = cart.find(item => item.id === id);

        if (tempItem.amount > 1) {
          tempItem.amount = tempItem.amount - 1;

          Storage.saveCart(cart);

          this.setCartValues(cart);

          subtractAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          subtractAmount.parentElement.parentElement.remove();
          cart = cart.filter(item => item.id !== id);

          this.removeItem(id);
        }
      }
    });
  }

  clearCart() {
    let cartItems = cart.map(item => item.id);
    cartItems.forEach(id => this.removeItem(id));

    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }

    this.hideCart();
  }

  removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart); //Set new cart items in localStorage
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `Add To Cart
              <i class="fas fa-shopping-cart"></i>`;

    this.hideCart();
  }

  getSingleButton(id) {
    return buttonsDOM.find(button => button.dataset.id === id);
  }
}
