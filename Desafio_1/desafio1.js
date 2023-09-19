console.log("Este es el desafío 1");

class ProductManager {
  constructor() {
    this.products = [];
  }

  // Método para obtener todos los productos.
  getProducts() {
    return this.products;
  }

  // Método para agregar productos nuevos.
  addProducts(title, description, price, thumbnail, code, stock) {
    // Usamos findIndex para buscar el índice del producto existente por su código.
    const productIndex = this.products.findIndex((product) => product.code === code);
    
    // Si no encontramos un producto con el mismo código (índice es -1), lo agregamos.
    if (productIndex === -1) {
      this.products.push({
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
      return;
    } else {
      // Si encontramos un producto con el mismo código, mostramos un mensaje de error.
      console.log(`El código del producto ${code} a agregar ya existe y no puede agregarse nuevamente.`);
      return;
    }
  }

  // Método para obtener un producto por su ID.
  getProductsById = (id) => {
    // Usamos find para buscar el producto por su ID.
    const product = this.products.find((product) => product.id === id);
    
    // Si no encontramos el producto, devolvemos un mensaje de error.
    return !product ? `El ID ${id} no fue encontrado` : product;
  }
}


////////////////////////TESTING////////////////////////
let productManager = new ProductManager();

// >>>>
productManager.addProducts("title", "description", 11 ,"thumbnail","code", 10);
productManager.addProducts("title", "description", 11 ,"thumbnail","code2", 10);
productManager.addProducts("title", "description", 11 ,"thumbnail","code2", 10);
console.log (productManager.getProducts())

// >>>>
console.log (productManager.getProductsById(1))
console.log (productManager.getProductsById(14))