import { Router } from "express";
import productModel from "../dao/models/product.model.js";

const router = Router();

//GET CON QUERY LIMITS
router.get("/", async (req, res) => {
  try {
    const products = await productModel.find().lean().exec();

    const QLimit = req.query.limit;
    if (QLimit) products.splice(QLimit);
    res.json({ status: "Success", payload: products });
  } catch (error) {
    console.log(error);
    res.json({ result: "Error...", error });
  }
});

//GET PRODUCT POR EL ID
router.get("/:pid", async (req, res) => {
  try {
    const pID = req.params.pid;
    const product = await productModel.findOne({ _id: pID }).lean().exec();
    res.json({ status: "Success", payload: product });
  } catch (error) {
    console.log(error);
    res.json({ result: "Error...", error });
  }
});

//AGREGAR PRODUCTO
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const addedProduct = new productModel(product);
    await addedProduct.save();
    res.json({ status: "Success", payload: addedProduct });
  } catch (error) {
    console.log(error);
    res.json({ result: "Error...", error });
  }
});

//BORRAR PRODUCTO
router.delete("/:pid", async (req, res) => {
  try {
    const pID = req.params.pid;
    const result = await productModel.deleteOne({ _id: pID });

    res.json({ status: "Success", payload: result });
  } catch (error) {
    console.log(error);
    res.json({ result: "Error...", error });
  }
});

//MODIFICAR PRODUCTO
router.put("/:pid", async (req, res) => {
  try {
    const pID = req.params.pid;
    const updateFields = req.body;
    const result = await productModel.updateOne({ _id: pID }, updateFields);

    res.json({ status: "Success", payload: result });
  } catch (error) {
    console.log(error);
    res.json({ result: "Error...", error });
  }
});

export default router;
