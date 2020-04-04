const Recipe = require('../models/recipe');

module.exports = {
  index(req, res) {
    Recipe.all(function(recipe){

      res.render('recipes/index', {recipe})  
    })
  },

  create(req, res){
    return res.render("recipes/create");
  },

  show(req, res){
    Recipe.find(req.params.id, function(recipes){
      
      if (!recipes) {
        return res.send("Recipe not found!")
      }

      recipes.ingredients = recipes.ingredients.split(','); 
      recipes.preparations = recipes.preparations.split(',');

        res.render("recipes/show", { recipes })
    }) 
  },

  edit(req, res){
  
    Recipe.find(req.params.id, function(recipe){
      if(!recipe) {
        return res.send('Recipe not found!');
      }

      return res.render('recipes/edit', { recipes });
    })
  },

  post(req, res){
    const keys = Object.keys(req.body)
  
    for(key of keys){
      if(req.body[key] == ""){
        return res.send('Please fill all fields!')
      }
    }

    Recipe.create(req.body, function(recipe){
      
      res.redirect(`recipes/${recipe.id}`)
    })
  },
    
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
      return res.send('Please, fill all fields');
    }

    Recipe.update(req.body, function() {
      return res.redirect(`recipes/${req.body.id}`)
    })
  },

  delete(req, res) {
    Recipe.delete(req.body.id, function() {
      return res.redirect(`/recipes`)
    })
  }
}