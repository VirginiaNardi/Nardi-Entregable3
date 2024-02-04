import fs from 'fs'

class Product {
    constructor(title, description, price, thumbnail, code, stock, id) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
 class ProductManager {
    constructor(path) {
        this.products = [];
        this.productIdCounter = 0; 
        this.path = path;
        this.loadProducts();
    }

    loadProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = fs.readFileSync(this.path, 'utf8');
                const parsedData = JSON.parse(data);
                if (Array.isArray(parsedData) && parsedData.length > 0) {
                    this.products = parsedData;
                    this.productIdCounter = Math.max(...parsedData.map(p => p.id)) + 1;
                }
            } else {
                this.products = [];
                this.productIdCounter = 1;
            }
        } catch (err) {
            console.log('Error al cargar los productos:', err.message);
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (err) {
            console.log('Error al guardar los productos:', err.message);
        }
    }

    addProduct(product) {
        product.id = ++this.productIdCounter; // Incremento automático de id
        this.products.push(product);
        console.log(`El producto ${product.title} fue agregado con éxito`);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        let productFound = this.products.find(prod => prod.id === id);

        if (productFound) {
            console.log(`El producto con id: ${id} es:`);
            return productFound;
        } else {
            console.error(`Producto con id ${id} no encontrado`);
        }
    }

    updateProduct(id, updateProduct) {
        let productIndex = this.products.findIndex(prod => prod.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updateProduct, id: this.products[productIndex].id };
            this.saveProducts();
            console.log(`El producto con id ${id} fue actualizado con éxito`);
        } else {
            console.error(`El producto con id ${id} no fue encontrado`);
        }
    }

    deleteProduct(id) {
        let productIndex = this.products.findIndex(prod => prod.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProducts();
            console.log(`Producto con id ${id} eliminado con éxito`);
        } else {
            console.error(`El producto con id ${id} no fue encontrado`);
        }
    }
}

export const productManager = new ProductManager('productos.json');

const producto1 = new Product ('producto 1', 'descripcion', 10, 'sin img', 'abc123',20)
const producto2 = new Product ('producto 2', 'descripcion', 20, 'sin img', 'abc456',20)
const producto3 = new Product ('producto 3', 'descripcion', 30, 'sin img', 'abc789',20)
const producto4 = new Product ('producto 4', 'descripcion', 40, 'sin img', 'def123',20)
const producto5 = new Product ('producto 5', 'descripcion', 50, 'sin img', 'def456',20)
const producto6 = new Product ('producto 6', 'descripcion', 60, 'sin img', 'def789',20)
const producto7 = new Product ('producto 7', 'descripcion', 70, 'sin img', 'ghi123',20)
const producto8 = new Product ('producto 8', 'descripcion', 80, 'sin img', 'ghi456',20)
const producto9 = new Product ('producto 9', 'descripcion', 90, 'sin img', 'ghi789',20)
const producto10 = new Product ('producto 10', 'descripcion', 100, 'sin img', 'jkl123',20)



//productos a agregar
// productManager.addProduct(producto1)
// productManager.addProduct(producto2)
// productManager.addProduct(producto3)
// productManager.addProduct(producto4)
// productManager.addProduct(producto5)
// productManager.addProduct(producto6)
// productManager.addProduct(producto7)
// productManager.addProduct(producto8)
// productManager.addProduct(producto9)
// productManager.addProduct(producto10)


