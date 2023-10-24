import { Router } from "express";
import CartManager from "../CartManager.js";


const router = Router();

// Obtener un carrito por su ID
router.get("/:cid", (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = CartManager.getCart(cartId);
    
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener carrito" });
  }
});

// Crear un nuevo carrito
router.post("/", (req, res) => {
  try {
    CartManager.addCart();
    res.status(201).json({ message: "Carrito creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear carrito" });
  }
});

// Agregar un producto a un carrito
router.post("/:cid/product/:pid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const quantity = parseInt(req.body.quantity);

  try {
    const added = CartManager.addProductToCart(cartId, productId, quantity);

    if (added) {
      res.status(201).json({ message: "Producto agregado al carrito exitosamente" });
    } else {
      res.status(404).json({ error: "Carrito no encontrado o producto no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
});

module.exports = router;
