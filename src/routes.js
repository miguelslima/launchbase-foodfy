const express = require('express');
const routes = express.Router();
const multer = require('./app/middlewares/multer');
const users = require('./app/controllers/users');
const chefs = require('./app/controllers/chefs');
const recipes = require('./app/controllers/recipes');

routes.get('/', function(req, res){
  return res.redirect('/users')
})
routes.get('/users', users.index)
routes.get('/users/about', users.about)
routes.get('/users/recipes', users.recipes)
routes.get('/users/recipes/:index', users.show)

routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", multer.array("photos", 6), recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", multer.array("photos", 6), recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/create", chefs.create);
routes.get("/admin/chefs/:id", chefs.show);
routes.get("/admin/chefs/:id/edit", chefs.edit); 
routes.post("/admin/chefs", chefs.post); // Cadastrar novo chef
routes.put("/admin/chefs", chefs.put); // Editar um chef
routes.delete("/admin/chefs", chefs.delete); // Deletar um chef

module.exports = routes