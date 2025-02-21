const mongoose = require("mongoose");
require("dotenv").config(); // Załadowanie zmiennych środowiskowych z pliku .env

const mongoDbCredentials = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mrobyik.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoDbCredentials, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Połączenie z MongoDB udało się!");
    mongoose.disconnect(); // Rozłącz się po udanym połączeniu
  })
  .catch((error) => {
    console.error("Błąd połączenia z MongoDB:", error.message);
  });
