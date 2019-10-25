//Storage class is responsible for getting/setting elements from/to localStorage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}
