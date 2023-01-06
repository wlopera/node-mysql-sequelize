# node-mysql-sequelize
NodeJS Uso de Base de datos -MySQL y Sequelize

## NODEJS - MYSQL
---------------------------------------------------------------------------------------------
### package.json
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

### index.js
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

### routes\products.js
```
const express = require("express");
const router = express.Router();
const productController = require("../controller/products");

router.get("/", productController.getIndex);
router.post("/", productController.postAddProduct);

module.exports = router;

```

### models\products.js
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

### controller\products.js
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
## Salida 
<img src="https://user-images.githubusercontent.com/7141537/211071467-16a7686d-6980-4945-971d-c51057e3fa20.PNG" height="800" width="800" />

![Captura](https://user-images.githubusercontent.com/7141537/211071470-1dda6e37-7ac8-412a-9b97-b5e8faa593f8.PNG)

![Captura](https://user-images.githubusercontent.com/7141537/211071471-01b64713-13f6-4b1d-9868-a3a3d047b1f0.PNG)

![Captura](https://user-images.githubusercontent.com/7141537/211072419-cbb0f82e-eea5-4320-913a-d7534e60fc1e.PNG)
---------------------------------
``` request: 
{
    "title": "Java WEB",
    "price": 18.75,
    "description": "Java WEb 2023",
    "imageUrl": "imagenJava"
}
```
---------------------------------

## Anexo

### Query.sql
```
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `description` text NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

---------------------------------------------------------------------------------------------
