import { Router } from "express";
import ProductManager from "../manager/ProductManager.js";

const router = Router();

// Product List
let productsInList = ProductManager.getProducts();

router.get("/", (req, res) => {
  res.render("home", { productsInList });
});

export default router;
