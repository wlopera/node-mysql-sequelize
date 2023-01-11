const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/products");
//const db = require("./util/database");
const sequelize = require("./util/database");

const app = express();

// const message = (req, res) => {
//   res.writeHead(200, { "content-type": "text/plain" });
//   res.write("Hola Mundo ..!");
//   res.end();
// };
// app.use("/", message);

// db.execute("SELECT * FROM products")
//   .then((result) => {
//     // console.log("Resultado: ", result[0], result[1]);
//     console.log("Resultado: ", result[0]);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(productRoutes);

sequelize
  .sync()
  .then((result) => {
    // console.log("Respuesta de Sequealize:", result);
    app.listen(3000, () => {
      console.log("La Aplicación está funcionando en el puerto 3000");
    });
  })
  .catch((err) => {
    console.log("Error Sequealize:", err);
  });
