const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const recipes = require('./data')

server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
	noCache: true
})

server.get("/", function(req, res) {
  return res.render("index", { items: recipes})
})

server.get("/about", function(req, res) {
  return res.render("about")
})

server.get("/recipes", function(req, res) {
  return res.render("recipes", { items: recipes})
})

server.get("/recipes/:index", function (req, res) { 
  const {index: receiptIndex} = req.params;

  const recipe = recipes[receiptIndex];

  if (!recipe) return res.render("not-found")
  
  return res.render('receipt', { item: recipe })
})

server.use(function(req, res) {
  res.status(404).render("not-found")
})

server.listen(5000., function() {
  console.log("Server is running");
}); 