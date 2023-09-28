import { Router } from "express";
const router = Router();
import cartsManager from '../dao/manager/CartsManager.js';

// Get carts
router.get('/', async (req, res) => {
  try{
    const carts = await cartsManager.getCarts();
    res.status(200).json({ carts });
  }catch(error){
    console.error(`Error trying to get carts: ${error}`);
    res.status(500).send(`Internal server error trying to get carts: ${error}`);
  };
});

// Get cart by ID
router.get('/:cid', async (req, res) => {
  try{
    const cid = req.params.cid;
    const cart = await cartsManager.getCartById(cid);
    res.status(200).json({ cart });
  }catch(error){
    console.error(`Error trying to get cart by id: ${error}`);
    res.status(500).send(`Internal server error trying to get cart by id: ${error}`);
  };
});

// Create cart
router.post('/', async (req, res) => {
  try{
    const product = req.body;
    const newCart = await cartsManager.addCart(product);
    res.status(200).json({ newCart });
  }catch(error){
    console.error(`Error trying create cart: ${error}`);
    res.status(500).send(`Internal server error trying create cart: ${error}`);
  };
});

// Add product to cart
router.post('/:cid/products/:pid', async (req, res) => {
  try{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const currentCart = await cartsManager.addProduct(cid, pid);
    res.status(202).json(currentCart);
  }catch(error){
    console.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };
});

// Update all products of cart
router.put('/:cid', async (req, res) => {
  try{
    const cid = req.params.cid;
    const updatedProducts = req.body;
    const currentCart = await cartsManager.updateAllProducts(cid, updatedProducts);
    res.status(202).json(currentCart);
  }catch(error){
    console.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };
});

// Update quantity of products
router.put('/:pid/products/:pid', async (req, res) => {
  try{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { updatedQuantity } = req.body;
    const currentCart = await cartsManager.updateQuantity(cid, pid, updatedQuantity);
    res.status(202).json(currentCart);
  }catch(error){
    console.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };
});

// Delete product of cart
router.delete('/:cid/products/:pid', async (req, res) => {
  try{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const currentCart = await cartsManager.deleteProductOfCart(cid, pid);
    res.status(202).json(currentCart);
  }catch(error){
    console.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };
});

//Delete by post
router.post('/:cid/products/delete/:pid', async (req, res) => {
  try{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const currentCart = await cartsManager.deleteProductOfCart(cid, pid);
    res.status(202).json(currentCart);
  }catch(error){
    console.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };
});

// Delete all products of cart
router.delete('/:cid', async (req, res) => {
  try{
    const cid = req.params.cid;
    const currentCart = await cartsManager.deleteAllProductsOfCart(cid);
    res.status(202).json(currentCart);
  }catch(error){
    console.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };
});

export default router;