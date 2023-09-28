import { Router } from 'express';
const router = Router();

import cartsManager from '../dao/manager/CartsManager.js';

// Cart view
router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;

    try{
        const cart = await cartsManager.getCartById(cartId);
        
        res.status(200).render('cart', {
            script: "cart",
            style: "cart",
            title: "Carrito",
            cart: cart
        });
    }catch(error){
        res.status(500).send(`Error trying to fetch cart data: ${error}`);
    };
});


export default router;