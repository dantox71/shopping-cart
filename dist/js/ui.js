//UI class is responsible for displaying products
class UI {
  displayProducts(products) {
    let result = "";
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
}
