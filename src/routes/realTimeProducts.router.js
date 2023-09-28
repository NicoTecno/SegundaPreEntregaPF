import { Router } from 'express';
const router = Router();
import productManager from '../dao/manager/ProductManager.js';

const realTimeProductsRouter = (socketServer) => {

    socketServer.on('connection', async (socket) => {
        console.log(`New connection: ${socket.id}`);
        // Load products
        try{
            const products = await productManager.getProducts();
            await socketServer.emit('products', products);
        } catch (error){
            console.error(`Error has been ocurred trying to load the products: ${error}`);
        };

        // Create Products
        socket.on('newProduct', async (newProduct) => {
            try {
                await productManager.addProduct(newProduct);
                const products = await productManager.getProducts();
                await socketServer.emit('products', products);
            } catch (error) {
                console.error(`Error has been ocurred trying create a product: ${error}`);
            };
        });

        // Delete Product 
        socket.on('deleteProduct', async (productToDelete) => {
            try{
                await productManager.deleteProduct(productToDelete);
                const products = await productManager.getProducts();
                await socketServer.emit('products', products);
            } catch (error) {
                console.error(`Error has been ocurred trying delete a product: ${error}`);
            };
        });
    });

    // Render view
    router.get('/', (req, res) => {
        res.status(200).render('realTimeProducts', {
            script: 'realTimeProducts',
            style: 'index',
            title: 'Productos en tiempo real'
        });
    });

    return router;
};

export default realTimeProductsRouter;