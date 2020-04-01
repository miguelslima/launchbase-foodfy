const Receipt = require('../models/receipt');

module.exports = {
  index(req, res) {
    Chef.all(function(receipts){

      res.render('receipts/index', {receipts})  
    })
  },

  create(req, res){
    return res.render("receipts/create");
  },

  show(req, res){
    Chef.find(req.params.id, function(chef){
      if (!chef) return res.send("Receipt not found!")

      Chef.findChefRecipe(req.params.id, function(){
        res.render("receipts/show", { chef })
      })
    }) 
  },

  edit(req, res){
    Chef.find(req.params.id, function(chef){
      if(!chef) {
        return res.send('Receipt not found!');
      }

      return res.render('receipts/edit', { chef });
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
      
      res.redirect(`receipts/${Chef.id}`)
    })
  },
    
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
      return res.send('Please, fill all fields');
    }

    Chef.update(req.body, function() {
      return res.redirect(`receipts/${req.body.id}`)
    })
  },

  delete(req, res) {
    Chef.delete(req.body.id, function() {
      return res.redirect(`/admin/receipts`)
    })
  }
}