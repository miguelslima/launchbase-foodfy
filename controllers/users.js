const data = require('../data.json')

exports.index = function (req, res) {
  let recipesFiltered = []

  for (let i = 0; i < 6; i++) {
    recipesFiltered.push(data.recipes[i])
  }
  return res.render("users/index", { items: recipesFiltered })
}

exports.about = function(req, res){
  return res.render('users/about')
}

exports.recipes = function(req, res){
  return res.render('users/recipes', {recipes: data.recipes})
}

exports.recipe = function (req, res) {
  const { index: receiptIndex } = req.params;

  const recipe = data.recipes[receiptIndex];

  if (!recipe) return res.render("not-found")

  return res.render('/users/recipe', { recipes: data.recipes })
}

exports.show = function(req, res){
  const recipeIndex = req.params.index;
  
  res.render('users/recipe', {recipes: data.recipes[recipeIndex] })
}
