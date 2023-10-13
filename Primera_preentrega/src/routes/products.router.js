const { Router } = require("express");
const ProductManager = require("../ProductManager.js");

const router = Router();

// Obtener todos los productos o con límite
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);

  try {
    const products = ProductManager.getProducts();
    if (isNaN(limit) || limit <= 0) {
      res.status(200).json(products);
    } else {
      const limitedProducts = products.slice(0, limit);
      res.status(200).json(limitedProducts);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Obtener un producto por ID
router.get("/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = ProductManager.getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

// Agregar un nuevo producto
router.post("/", (req, res) => {
  const { title, description, category, price, thumbnail, code, stock } = req.body;

  try {
    const added = ProductManager.addProduct(title, description, price, thumbnail, code, stock, category);
    if (added) {
      res.status(201).json({ message: "Producto agregado exitosamente" });
    } else {
      res.status(409).json({ error: "El producto ya existe" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al agregar producto" });
  }
});

// Actualizar un producto
router.put("/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  try {
    const updated = ProductManager.updateProduct(productId, updatedProduct);
    if (updated) {
      res.status(200).json({ message: "Producto actualizado exitosamente" });
    } else {
      res.status(404).json({ error: "Producto no encontrado o código en uso" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al actualizar producto" });
  }
});

// Eliminar un producto por ID
router.delete("/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const deleted = ProductManager.deleteProduct(productId);
    if (deleted) {
      res.status(200).json({ message: "Producto eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al eliminar producto" });
  }
});

module.exports = router;
