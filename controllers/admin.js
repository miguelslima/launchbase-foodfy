const data = require('../data.json')
const fs = require('fs');

exports.index = function (req, res) {

  return res.render("admin/index", {recipes: data.recipes})
}

exports.create = function(req, res){
  return res.render('admin/create')
}

exports.show = function(req, res){
  const { id } = req.params

  const foundRecipe = data.recipes.find(function(recipe){
    return recipe.id == id
  })

  if (!foundRecipe) return res.send("Recipe not found!")

  const recipe = {
    ...foundRecipe
  }
  
  res.render("admin/show", { recipe });
}

exports.edit = function(req, res){
  const { id } = req.params
  
    const foundRecipe = data.recipes.find(function(recipe){
      return recipe.id == id
    })
  
    if (!foundRecipe) return res.send("Recipe not found!")
  
    const recipe = {
      ...foundRecipe
    }
    res.render("admin/edit", {recipe})
}

exports.post = function(req, res){

    let ingredients = [];
    let preparations = [];
    const keys = Object.keys(req.body)
    
    for(key of keys){
      if(req.body[key] == ""){
        return res.send('Please fill all fields!')
      }
    }
  
    let id = 1;
    id = Number(data.recipes.length + 1);
  
    data.recipes.push({
      id,
      ingredients,
      preparations,
      ...req.body
    })
    
    console.log(req.body)
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
      if(err) res.send("Write file error!")
      
      res.redirect(`/admin/recipes/${id}`)
    })
  }
  
exports.put = function(req, res) {
  const { id } = req.body;
  let index = 0;
  const foundRecipe = data.recipes.find(function(recipes, foundIndex){
    if(id == recipes.id) {
      index = foundIndex;
      return true;
    }
  }) 

  if(!foundRecipe) {
    return res.render("not-found.njk");
  }

  const recipe = {
    ...foundRecipe,
    ...req.body,
    id: Number(req.body.id)
  }

  data.recipes[index] = recipe;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Write error!");
    
    return res.redirect(`/admin/recipes/${id}`);
  })
}

exports.delete = function(req, res) {
  const { id } = req.body;

  const filteredRecipes = data.recipes.filter(function(recipe){
    return recipe.id != id;
  });

  data.recipes = filteredRecipes;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write error!");

    return res.redirect("/admin/recipes");
  })
}
