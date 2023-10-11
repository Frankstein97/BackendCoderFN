console.log("Este es el desafío 3, Express con trycatchttp");
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
// import express from 'express' ;
const express = require("express");
const app = express();

// Trayendo logica del desafio2
const { ProductManager } = require("./desafio2.js");
const manager = new ProductManager("./products.json");

const PORT = 8080;

//get con limite >> http://localhost:8080/products
app.get("/products", (req, res) => {
  const allProducts = manager.getProducts();
  const limit = req.query.limit;

    // Verifica si se proporciona un límite
  if (limit) {
    res.send(allProducts.slice(0, limit));
  } else {
    res.send(allProducts);
  }
});

// get by ID >> http://localhost:8080/products/1

app.get("/products/:pid", async (req, res) => {
  try { 
  let productId = parseInt(req.params.pid);
  let response = await manager.getProductById(productId);
  console.log(response);
res.json (response);
} catch (error){ 
  console.error(error)
  res.status(404).json ({ Error: "Producto no encontrado" });
  }
});

//listen: >> http://localhost:8080/
app.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}`);
});
