console.log("Este es el desafio 1")

class ProductManager {

    constructor() {
        this.products = []
    }

getProducts() {
        return this.products;
}
   
addProducts( title, description, price,thumbnail, code, stock) {
    this.products.push ({
            id: this.products.length + 1 , 
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        })

 //Validar si existe el code 
    const productCodeIndex = this.products.findIndex(products => products.code === this.products.code);
    if (productCodeIndex === -1) {
        this.products.push(this.products)
        console.log('Producto agregado correctamente :)')
        return;
    } else {
        console.log(`El code ${this.products.code} del producto a agregar ya existe y no puede agregarse nuevamente.`)
        return;
    }


    }

getProductsById = (id) => {
    const productId = this.products.find(product=> product.id === id)
    return (!productId) ? `El id ${id} no fue encontrado` : productId
}
}

////////////////////////TESTING////////////////////////
let productManager = new ProductManager();

// >>>>
productManager.addProducts("title", "description", 11 ,"thumbnail","code", 10);
productManager.addProducts("title", "description", 11 ,"thumbnail","code2", 10);
productManager.addProducts("title", "description", 11 ,"thumbnail","code2", 10);
console.log (productManager.getProducts())

// >>>>
console.log (productManager.getProductsById(1))
console.log (productManager.getProductsById(14))