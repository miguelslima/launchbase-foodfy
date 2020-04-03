const Receipt = require('../models/Receipt');

module.exports = {
  index(req, res) {
    Receipt.all(function(recipes){

      res.render('Receipts/index', {recipes})  
    })
  },

  create(req, res){
    return res.render("Receipts/create");
  },

  show(req, res){
    
    Receipt.find(req.params.id, function(receipt){
      if (!receipt) {
        return res.send("Receipt not found!")
      }
      console.log(receipt)
      Receipt.findRecipe(req.params.id, function(){
        res.render("receipts/show", { receipt })
      })
    }) 
  },

  edit(req, res){
    Receipt.find(req.params.id, function(Receipt){
      if(!Receipt) {
        return res.send('Receipt not found!');
      }

      return res.render('Receipts/edit', { Receipt });
    })
  },

  post(req, res){
    const keys = Object.keys(req.body)
    
    for(key of keys){
      if(req.body[key] == ""){
        return res.send('Please fill all fields!')
      }
    }

    Receipt.create(req.body, function(Receipt){
      
      res.redirect(`Receipts/${Receipt.id}`)
    })
  },
    
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
      return res.send('Please, fill all fields');
    }

    Receipt.update(req.body, function() {
      return res.redirect(`recipes/${req.body.id}`)
    })
  },

  delete(req, res) {
    Receipt.delete(req.body.id, function() {
      return res.redirect(`/admin/Receipts`)
    })
  }
}