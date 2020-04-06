const Recipe = require('../models/recipe');
const Chef = require('../models/chef');
const File = require('../models/file');

module.exports = {
  async index(req, res) {
    let results = await Recipe.all()
    const recipes = results.rows;
    return res.render('recipes/index', {recipes})  
    
  },

  async create(req, res){
    let results = await Recipe.chefsSelect()
    
    const options = results.rows;
    
    return res.render("recipes/create", {chefOptions: options});
  },

  async show(req, res){

    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]  
    if (!recipe) {
      return res.send("Recipe not found!")
    }
      
    res.render("recipes/show", { recipe })
  
  },

  async edit(req, res){
    
    let results = await Recipe.find(req.params.id);
    const recipe = results.rows[0];
    if(!recipe) {
      return res.send('Recipe not found!');
    }

    results = await Recipe.chefsSelect()
    const options = results.rows;

    results = await Recipe.files(recipe.id);
    let files = results.rows;
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    return res.render('recipes/edit', { recipe, files, chefOptions: options});
  },

  async post(req, res) {
    
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
      return res.send("Please, fill all fields");
    }

    if (req.files.length == 0)
    return res.send('Please, send at least one image')


    let results = await Recipe.create(req.body)
    const recipeId = results.rows[0].id
 
    const filesPromise = req.files.map(file => File.create({...file, recipe_id: recipeId}))
    await Promise.all(filesPromise)
    
    return res.redirect(`recipes/${recipeId}/edit`)
    
  },
    
  async put(req, res){
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") res.send('Please, fill all fields!')
    }

    await Recipe.update(req.body)

    return res.redirect(`/admin/recipes/${req.body.id}`)
    
  },

  async delete(req, res) {
    await Recipe.delete(req.body.id);
    return res.redirect(`/admin/recipes`)
  }
}