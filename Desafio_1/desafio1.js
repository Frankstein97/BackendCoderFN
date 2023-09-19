console.log("Este es el desafío 1, porfavor que este bien ahora T_T");

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
    const isCodeUnique = this.products.every((product) => product.code !== code);
    if (!isCodeUnique) {
      console.log(`El código ${code} del producto ya está en uso.`);
  return;

  }
    // Si no encontramos un producto con el mismo código (índice es -1), lo agregamos.
    if (isCodeUnique) {
      this.products.push({
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
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
productManager.addProducts("title", "description", 11 ,"thumbnail","121212", 10);
productManager.addProducts("title", "description", 11 ,"thumbnail","121212", 10);
console.log (productManager.getProducts())

// >>>>
console.log (productManager.getProductsById(1))
console.log (productManager.getProductsById(14))