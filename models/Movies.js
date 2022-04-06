const mongoose = require('mongoose');
<<<<<<< HEAD
mongoose.connect("mongodb+srv://mongo_user:wgaku9wWOgMj0eNv@cluster0.ubnal.mongodb.net/test");
=======

>>>>>>> 12d3861a7869305b532fca7db2ac444f9ab65642
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

