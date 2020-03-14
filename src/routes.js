const express = require('express');
const routes = express.Router();
const users = require('./app/controllers/users');
const recipes = require('./app/controllers/admin');

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

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

module.exports = routes