const apiKey = process.env.API_KEY;
const express = require('express');
const mongoose = require('mongoose');

const Movie = require("./models/Movies")

const app = express()
const port = 3000

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.get("/createMovie", (req,res)=>{
    res.render("createMovie")
})

app.post("/createMovie", (req,res)=>{
    let mov = new Movie(req.body);
    mov.save()
    .then(item =>{
        res.send("item saved to database");
    })
    .catch(err =>{
        res.status(400).send(err);
    })
})

app.use("/editMovie/", (req, res)=>{
    
})

app.use("/removeMovie", (req, res) =>{
    res.render('removeMovie')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})