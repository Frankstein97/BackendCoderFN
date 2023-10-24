import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
    this.loadCart();
  }

  loadCart() {
    if (fs.existsSync(this.path)) {
      this.cart = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      this.cart = [];
    }
  }

  saveCart() {
    fs.writeFileSync(this.path, JSON.stringify(this.cart, null, "\t"));
  }

  addCart() {
    const newCart = {
      id: this.cart.length === 0 ? 1 : this.cart[this.cart.length - 1].id + 1,
      products: [],
    };

    this.cart.push(newCart);
    this.saveCart();
  }

  getCart(id) {
    const cart = this.cart.find((c) => c.id === id);
    return cart || null;
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCart(cartId);

    if (!cart) {
      return false;
    }

    const productIndex = cart.products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    this.saveCart();
    return true;
  }
}

module.exports = new CartManager("./data/carts.json");

//probe con esto pero no hay caso de hacer las rutas con dirname
// const path = require('path');
// const currentDir = __dirname;
// const fileName = '/productos.json';
// const url = path.join (currentDir, fileName);