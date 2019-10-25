//Storage class is responsible for getting/setting elements from/to localStorage
class Storage {
  //Save products to localStorage
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  //Get product with particular id from localStorage
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));

    return products.find(product => product.id === id);
  }

  //Save cart to localStorage
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  //Parse to js object and return cart item from localStorage if any exist or empty array in other case
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}
