console.log("Este es el desafío 2, file System!");
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
const fs = require("fs");

class ProductManager {
  constructor(path) {  //La clase debe contar con una variable this.path
    this.path = path;

    if (fs.existsSync(this.path)) {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8", "\t"));
    } else {
      this.products = [];
    }
  }

  // Método para agregar productos nuevos.
  addProduct = (title, description, price, thumbnail, code, stock) => {

    // Verificar si el código del producto ya existe
    let findProduct = this.products.some((p) => p.code === code);

    let product = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    // buscar el id en product
    if (this.products.length === 0) {
      product["id"] = 1;
    } else {
      product["id"] = this.products[this.products.length - 1]["id"] + 1;
    }

    if (findProduct) {
      console.log("El producto ya existe.");
    } else {
      this.products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t")); // << WRITE
      console.log("Producto añadido");
    }
  };

// Método para obtener todos los productos.
  getProduct() {
    return console.log(this.products);
  }

     // Usamos find para buscar el producto por su ID.
  getProductById(id) {
    let findById = this.products.find((p) => p.id === id);
    // Si no encontramos el producto, registramos un mensaje de error.
    !findById ? console.log("Product error") : console.log("Product encontrado");
    console.log(`Product ${id}:`, findById);
  }

  // Metodo para actualizar el producto segun id
  updateProduct(id, value, newValue) {
    let findIndex = this.products.findIndex((e) => e.id === id);
    let validKeys = Object.keys(this.products[findIndex]).some(
      (e) => e === value
    );

    if (value === "id") {
      console.log("The Id no se puede modificar");
    } else if (!validKeys) {
      console.log("La key no es valida");
    } else {
      this.products[findIndex][value] = newValue;
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
    }
  }

  // Metodo para borrar producto segun id 
  deleteProduct(id) {
    let searchToDelete = this.products.some((p) => p.id === id);
    if (searchToDelete) {
      this.products = this.products.filter((e) => e.id !== id);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
      console.log("Product borrado con exito");
    } else {
      console.error("Product error");
    }
  }
}

// MANAGER
const manager = new ProductManager("./products.json");

// TEST PRODUCTS
manager.addProduct(
  "Product1",
  "Product description",
  210,
  "imagen.jpg",
  "PR01",
  5
);
manager.addProduct(
  "Product2",
  "Product description",
  220,
  "imagen.jpg",
  "PR02",
  10
);
manager.addProduct(
  "Product3",
  "Product description",
  230,
  "imagen.jpg",
  "PR03",
  15
);
manager.addProduct(
  "Product4",
  "Product description",
  240,
  "imagen.jpg",
  "PR04",
  20
);

// // getProducts
// manager.getProduct();

// // GET getProductById
// manager.getProductById(2);

// // updateProduct
// manager.updateProduct(3, "price", 500);
// manager.getProduct(); // <- Chequear

// // // deleteProduct
// manager.deleteProduct(4);
// manager.getProduct(); // <- Chequear
