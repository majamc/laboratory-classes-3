const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config");
const logger = require("./utils/logger");
const productRoutes = require("./routing/product");
const logoutRoutes = require("./routing/logout");
const killRoutes = require("./routing/kill");
const homeRoutes = require("./routing/home");
const { STATUS_CODE } = require("./constants/statusCode");
// 📦 Dependy the Importer
// Zaimportuj moduł 'getFileFromAbsolutePath', może Ci się przydać do ustawienia katalogu plików statycznych!
const getFileFromAbsolutePath = require("./utils/getFileFromAbsolutePath");

const app = express();

// 🔧 Configo the Setter
// Zarejestruj "view engine" jako "ejs".
// Podpowiedź: app.set(...);
app.set('view engine','ejs');
// Zarejestruj "views" jako "views".
// Podpowiedź: app.set(...);
app.set('views', getFileFromAbsolutePath('views'));

// 🔧 Configo the Setter
// Ustaw publiczny katalog plików statycznych w middleware.
// Podpowiedź: app.use(express.static(...));
app.use(express.static(getFileFromAbsolutePath('public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((request, _response, next) => {
  const { url, method } = request;

  logger.getInfoLog(url, method);
  next();
});

app.use("/product", productRoutes);
app.use("/logout", logoutRoutes);
app.use("/kill", killRoutes);
app.use(homeRoutes);
app.use((req, res) => {
  res.status(404).render("404", {
    headTitle: "Page Not Found",
    path: "",
    menuLinks: [],
    activeLinkPath: req.path,
  });
});

app.listen(PORT);
