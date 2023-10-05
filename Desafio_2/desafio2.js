console.log("Este es el desafío 2, file System! con correcciones");
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
const fs = require("fs");

class ProductManager {
  constructor(path) {
    //La clase debe contar con una variable this.path
    this.path = path;

    if (fs.existsSync(this.path)) {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8", "\t"));
    } else {
      this.products = [];
    }
  }

  // Método para agregar productos nuevos.
  addProduct = (title, description, price, thumbnail, code, stock) => {
    // Validar que todos los parámetros requeridos estén presentes si o si
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Faltan parámetros para agregar el producto.");
      return;
    }
  
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
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
      console.log("Producto añadido");
    }
  };
  

  // Método para obtener todos los productos.
  getProducts() {
    if (fs.existsSync(this.path)) {
      const productData = fs.readFileSync(this.path, "utf-8");
      try {
        const products = JSON.parse(productData);
        return products;
      } catch (error) {
        console.error("error al obtener archivo json", error);
        return [];
      }
    } else {
      console.error("no se puede obtener archivo de productos", this.path);
      return [];
    }
  }

  // Usamos find para buscar el producto por su ID.
  getProductById(id) {
    const foundProduct = this.products.find((p) => p.id === id);

    if (!foundProduct) {
      throw new Error("Producto no encontrado");
    }
    return foundProduct;
  }

  // Metodo para actualizar el producto segun id
  updateProduct(id, updatedProduct) {
    const findIndex = this.products.findIndex((e) => e.id === id);
  
    if (findIndex === -1) {
      console.log("Producto no encontrado, nada que actualizar");
      return;
    }
  
    // Validar si el código del producto se repite en otro producto
    const isCodeRepeated = this.products.some(
      (p, index) => index !== findIndex && p.code === updatedProduct.code
    );
  
    if (isCodeRepeated) {
      console.log(
        "El código ya existe en otro producto. No se puede actualizar."
      );
      return;
    }
  
    // Actualizar solo los campos válidos del producto
    for (const key in updatedProduct) {
      if (key !== "id" && key in this.products[findIndex]) {
        this.products[findIndex][key] = updatedProduct[key];
      }
    }
  
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
    console.log("Producto actualizado con éxito");
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




////////////////////////TESTING///////////////////////////


// MANAGER
const manager = new ProductManager("./products.json");

// // TEST PRODUCTS
// manager.addProduct(
//   "Product1",
//   "Product description",
//   210,
//   "imagen.jpg",
//   "PR01",
//   5
// );
// manager.addProduct(
//   "Product2",
//   "Product description",
//   220,
//   "imagen.jpg",
//   "PR02",
//   10
// );
// manager.addProduct(
//   "Product3",
//   "Product description",
//   230,
//   "imagen.jpg",
//   "PR03",
//   15
// );
// manager.addProduct(
//   "Product4",
//   "Product description",
//   240,
//   "imagen.jpg",
//   "PR04",
//   20
// );

// // getProducts
// const allProducts = manager.getProducts();
// console.log(allProducts);

// // getProductById
// const product = manager.getProductById(3);
// console.log('Producto encontrado:', product);

// updateProduct
const updatedData = {
  title: "Updated título",
  description: "Updated descripción",
  price: 199,
  thumbnail: "Updated.jpg",
  code: "1234", // Probar codigo repetido y codigo nuevo.
  stock: 50,
};
manager.updateProduct(4, updatedData);

// //  deleteProduct
// manager.deleteProduct(4);
// manager.getProducts(); // <- Chequear si lo borro da error
