const Product = require("../models/products");

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      console.log("Resultados:", rows);
      res.status(200).json(rows);
    })
    .catch((err) => console.log("Error consultando productos:", err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const product = new Product(null, title, price, description, imageUrl);
  product
    .save()
    .then(() => {
      this.getIndex(req, res, next);
    })
    .catch((err) => console.log("Error al agregar producto:", err));
};
