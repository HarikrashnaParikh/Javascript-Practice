const express = require("express");
const productRepo = require("../repositories/product.js");
const productsIndexTemplate = require("../views/products/index.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});
module.exports = router;
