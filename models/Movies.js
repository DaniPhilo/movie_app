const mongoose = require('mongoose');

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

