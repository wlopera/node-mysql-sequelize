# node-mysql-sequelize
NodeJS Uso de Base de datos -MySQL y Sequelize


### node-mysql-sequelize\package.json
```
{
  "name": "node-mysql",
  "version": "1.0.0",
  "description": "NodeJS conexion MySql",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "Node",
    "SQL"
  ],
  "author": "wlopera",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.20.1",
    "express": "^4.18.2",
    "mysql2": "^2.3.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

### node-mysql-sequelize\index.js
```
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/products");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(productRoutes);

app.listen(3000, () => {
  console.log("La Aplicación está funcionando en el puerto 3000");
});
```

### node-mysql-sequelize\routes\products.js
```
const express = require("express");
const router = express.Router();
const productController = require("../controller/products");

router.get("/", productController.getIndex);
router.post("/", productController.postAddProduct);

module.exports = router;

```

### node-mysql-sequelize\models\products.js
```
const db = require("../util/database");

module.exports = class Product {
  constructor(id, title, price, description, imageUrl) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    return db.execute(
      "INSERT INTO products(title, price, description, imageUrl) VALUES(?,?,?,?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }
  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }
};

```

### node-mysql-sequelize\controller\products.js
```
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
```
