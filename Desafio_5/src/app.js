import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import ProductManager from "./manager/ProductManager.js";
import homeRouter from "./routes/home.routes.js";
import ProductsRouter from "./routes/products.router.js";
import __dirname from "./utils.js";

const app = express();
const PORT = 8080;

// Configuración del servidor HTTP
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


// Middleware para analizar JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa CartsRouter si lo necesitas
// import CartsRouter from "./routes/carts.router.js";


// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Configura Socket.IO con el servidor HTTP
const io = new Server(httpServer);

// Configura Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "./public"));


app.use("/", homeRouter);


app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

let productsOnList = ProductManager.getProducts(); // Asegúrate de obtener los productos

// Configura Socket.IO
io.on("connection", (socket) => {
  console.log("Connection with socket:", socket.id);

  // Lista de productos
  socket.emit("productList", productsOnList);

  // Agregar producto
  socket.on("newProduct", (data) => {
    // Agrega lógica para agregar productos a la lista
    ProductManager.addProduct(data);
    productsOnList.push(data); // Suponiendo que tienes una lista de productos
    io.emit("productList", productsOnList);
    console.log("Product added: ", data);
  });

  // Eliminar producto
  socket.on("deleteProduct", (id) => {
    // Agrega lógica para eliminar productos de la lista
    productsOnList = productsOnList.filter((product) => product.id !== id);
    io.emit("productList", productsOnList);
  });
});
