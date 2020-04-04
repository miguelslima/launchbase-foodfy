const Recipe = require('../models/recipe');

module.exports = {
  index(req, res) {
    Recipe.all(function(recipes){
      res.render('recipes/index', {recipes})  
    })
  },

  create(req, res){
    Recipe.chefsSelect(function(options){
      
      return res.render("recipes/create", {chefOptions: options});
    })
  },

  show(req, res){

    Recipe.find(req.params.id, function(recipe){
      
      if (!recipe) {
        return res.send("Recipe not found!")
      }
      
        res.render("recipes/show", { recipe })
    }) 
  },

  edit(req, res){
    
    Recipe.find(req.params.id, function(recipe){
      if(!recipe) {
        return res.send('Recipe not found!');
      }

      Recipe.chefsSelect(function(options){
      
        return res.render('recipes/edit', { recipe, chefOptions: options});
      })
    })
  },

  post(req, res) {
    
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
      return res.send("Please, fill all fields");
    }

    if (req.files.lenght == 0) {
      return res.send('Please, send at least one image');
    }

    Recipe.create(req.body, function(recipe){
      return res.redirect(`recipes/${recipe.id}`);
    })
    
  },
    
  put(req, res){
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") res.send('Please, fill all fields!')
    }

    Recipe.update(req.body, function() {

      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
    
  },

  delete(req, res) {
    Recipe.delete(req.body.id, function() {
      return res.redirect(`/admin/recipes`)
    })
  }
}