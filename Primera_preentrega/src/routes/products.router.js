const { Router } = require("express");

// importo al manager
const ProductManager = require("../src/ProductManager.js");

const router = Router();

//get con limite >> http://localhost:8080/
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);

  try {
    // Verifica si se proporciona un límite
    if (limit === 0 || !limit) {
      res.status(200).json(ProductManager.getProduct());
    } else {
      const originalProduct = ProductManager.getProduct();
      let limitProducts = originalProduct.slice(0, limit);
      res.status(202).json(limitProducts);
    }
  } catch (error) {
    res.status(400).json({ info: "Error 404", error });
  }
});

// get by ID >> http://localhost:8080/products/1

router.get("/:pid", async (req, res) => {
  try {
    let productId = parseInt(req.params.pid);
    let response = await ProductManager.getProductById(productId);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json({ Error: "Producto no encontrado" });
  }
});

// post products >> http://localhost:8080/

router.post("/", async (req, res) => {
  const { title, description, category, price, thumbnail, code, stock } =
    req.body;

  const addPost = await ProductManager.addProduct(
    title,
    description,
    category,
    price,
    thumbnail,
    code,
    stock
  );

  addPost
    ? res.status(201).json({ info: "Product added" })
    : res.status(406).json({ info: "Product already present in list" });
});

// put products >> http://localhost:8080/
router.put("/", async (req, res) => {
  const { id, value, newValue } = req.body;
  (await ProductManager.updateProduct(id, value, newValue))
    ? res.status(201).json({ info: "Product updated" })
    : res.status(406).json({ info: "Product not found" });
});

// Delete Product
router.delete("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  let response = await ProductManager.deleteProduct(pid);
  response
    ? res.status(200).json({ info: "Product deleted" })
    : res.status(404).json({ info: "Product not found" });
});

module.exports = router;
