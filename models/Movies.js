const mongoose = require('mongoose');
const movieSchema = {
  titulo:{
    type:String,
    required:true,
    unique:true
  },
  year:{
    type:Number,
    required:true
  },
  director:{
    type:String,
    required:true
  },
  genero:{
    type:String,
    required:true
  },
  duracion:{
    type:String,
    required:true
  },
  imagen:{
    type:String,
    required:true
  }
}
const Movie = mongoose.model("movies", movieSchema);

module.exports = Movie;

