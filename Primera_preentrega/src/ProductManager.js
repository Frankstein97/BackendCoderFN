const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.loadProducts();
  }

  loadProducts() {
    if (fs.existsSync(this.path)) {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      this.products = [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
  }

  addProduct(title, description, price, thumbnail, code, stock, category) {
    if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
      throw new Error("Faltan parámetros para agregar el producto.");
    }

    if (this.isProductCodeUnique(code)) {
      const product = {
        id: this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category
      };

      this.products.push(product);
      this.saveProducts();
      return true;
    } else {
      throw new Error("El producto ya existe.");
    }
  }

  isProductCodeUnique(code) {
    return !this.products.some((p) => p.code === code);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }

    return product;
  }

  updateProduct(id, updatedProduct) {
    const productIndex = this.products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return false;
    }

    if (this.isProductCodeUnique(updatedProduct.code)) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct };
      this.saveProducts();
      return true;
    } else {
      throw new Error("El código de producto ya está en uso.");
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return false;
    }

    this.products.splice(productIndex, 1);
    this.saveProducts();
    return true;
  }
}

module.exports = new ProductManager("./data/products.json");
