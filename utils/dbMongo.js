const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/movies", { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

// Eventos
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

module.exports = mongoose;