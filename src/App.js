import express from 'express'
import { productManager } from './ProductManager.js';


const app = express()
const PORT = 8080

app.get('/products', async (req,res) => {
    try {
        let products = productManager.getProducts()
        const limit = parseInt(req.query.limit)
        if (!isNaN(limit)) {
            products = products.slice(0, limit)
        }
        res.json({ products})
    } catch (error) {
        res.status(500).json( {error: 'No existen productos'})
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = productManager.getProductById(productId);
        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
})

app.listen( PORT, () => {
    console.log(`server run on port: ${PORT}`)
})
