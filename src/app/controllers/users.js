const db = require('../../config/db');

module.exports = {

  index(req, res) {
    
    return res.render("users/index")
  },

  about(req, res){
    return res.render('users/about')
  },

  recipes(req, res){
    return res.render('users/recipes')
  },

  recipe (req, res) {
    return res.render('/users/recipe')
  },

  show(req, res){
    res.render('users/recipe')
  }
}