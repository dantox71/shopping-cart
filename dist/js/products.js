//Products class is responsible for gettings products
class Products {
  async getProducts() {
    try {
      let response = await fetch("db/products.json");
      let data = await response.json(); //Map to js object
      let products = data.items;
      products = products.map(item => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;

        return { title, price, id, image };
      });

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
