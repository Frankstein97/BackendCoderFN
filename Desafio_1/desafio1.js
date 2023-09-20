console.log("Este es el desafío 1, otra vez T_T");

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
    // Validar que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Por favor, complete todos los campos");
      return;
    }
  
    // Verificar si el código del producto ya existe
    const isCodeUnique = this.products.every((product) => product.code !== code);
    if (!isCodeUnique) {
      console.log(`El código ${code} del producto ya está en uso.`);
      return;
    }
  
    // Agregar el producto si todo está bien
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

  getProductsById = (id) => {
    // Usamos find para buscar el producto por su ID.
    const product = this.products.find((product) => product.id === id);
    // Si no encontramos el producto, registramos un mensaje de error.
    if (!product) {
      console.log(`El ID ${id} no fue encontrado`);
      return null;
    }
    return product;
  };
}

////////////////////////TESTING////////////////////////
let productManager = new ProductManager();

// >>>>
productManager.addProducts("title", "description", 11, "thumbnail", "code", 10);
productManager.addProducts("title","description",11,"thumbnail", "code2", 10);
productManager.addProducts("title","description",11,"thumbnail", "code2", 10);
productManager.addProducts("title", "description", 11, "thumbnail");
console.log(productManager.getProducts());

// >>>>
console.log(productManager.getProductsById(1));
console.log(productManager.getProductsById(14));
