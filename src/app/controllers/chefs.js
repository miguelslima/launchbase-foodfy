const Chef = require('../models/chef');

module.exports = {
  index(req, res) {
    Chef.all(function(chefs){

      res.render('chefs/index', {chefs})  
    })
  },

  create(req, res){
    return res.render("chefs/create");
  },

  show(req, res){
    Chef.find(req.params.id, function(chef){
      if (!chef) return res.send("Chef not found!")

      Chef.findChefRecipe(req.params.id, function(){
        res.render("chefs/show", { chef })
      })
    }) 
  },

  edit(req, res){
    Chef.find(req.params.id, function(chef){
      if(!chef) {
        return res.send('Chef not found!');
      }

      return res.render('chefs/edit', { chef });
    })
  },

  post(req, res){
    const keys = Object.keys(req.body)
  
    for(key of keys){
      if(req.body[key] == ""){
        return res.send('Please fill all fields!')
      }
    }

    Chef.create(req.body, function(Chef){
      
      res.redirect(`chefs/${Chef.id}`)
    })
  },
    
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
      return res.send('Please, fill all fields');
    }

    Chef.update(req.body, function() {
      return res.redirect(`/chefs/${req.body.id}`)
    })
  },

  delete(req, res) {
    Chef.delete(req.body.id, function() {
      return res.redirect(`/admin/chefs`)
    })
  }
}