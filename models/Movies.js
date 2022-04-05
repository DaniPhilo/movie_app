const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/movapp");
const movieSchema = {
  titulo:String,
  year:Number,
  director:String,
  genero:String,
  duracion:String,
  imagen:String
}
const Movie = mongoose.model("movies", movieSchema);
module.exports = Movie;

