console.log("Primera Pre Entrega Proyecto Final");

const express = require("express");
const app = express();
const PORT = 8080;

// Importando rutas
const ProductsRouter = require("./routes/products.router");
const CartsRouter = require("./routes/carts.router");

// Middleware para analizar JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar las rutas
app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
