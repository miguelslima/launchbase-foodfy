const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')


module.exports = {

  index(req, res) {
    
    Recipe.all(function(recipes){
      res.render('users/index', {recipes})  
    })
  },

  about(req, res){
    return res.render('users/about')
  },

  recipes(req, res){

    Recipe.all(function(recipes){
      res.render('users/recipes', {recipes})  
    })

  },

  recipe (req, res) {
    return res.render('/users/recipe')
  },

  show(req, res){
    res.render('users/recipe')
  }
}