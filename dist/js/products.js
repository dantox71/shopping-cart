//Products class is responsible for gettings products
class Products {
  async getProducts() {
    try {
      let contentful = await client.getEntries({
        content_type: "laptopStore"
      });

      // let result = await fetch("products.json");
      // let data = await result.json(); //Map to js object

      let products = contentful.items;
      console.log(products);
      // console.log(products[0].fields.image.fields.file.url);
      // console.log(products);
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
