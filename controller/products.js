const Product = require("../models/products");

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      console.log("Resultados:", products);
      res.status(200).json(products);
    })
    .catch((err) => console.log("Error consultando productos:", err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  Product.create({
    title,
    price,
    description,
    imageUrl,
  })
    .then((result) => console.log("Crear producto:", result))
    .catch((err) => console.log("Error agregando producto:", err));
};
