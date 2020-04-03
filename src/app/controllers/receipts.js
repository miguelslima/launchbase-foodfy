const Receipt = require('../models/receipt');

module.exports = {
  index(req, res) {
    Receipt.all(function(receipts){

      res.render('receipts/index', {receipts})  
    })
  },

  create(req, res){
    return res.render("receipts/create");
  },

  show(req, res){
    Receipt.find(req.params.id, function(receipt){
      
      if (!receipt) {
        return res.send("Receipt not found!")
      }

      receipt.ingredients = receipt.ingredients.split(','); 
      receipt.preparations = receipt.preparations.split(',');

        res.render("receipts/show", { receipt })
    }) 
  },

  edit(req, res){
    Receipt.find(req.params.id, function(receipt){
      if(!receipt) {
        return res.send('Receipt not found!');
      }

      return res.render('receipts/edit', { receipt });
    })
  },

  post(req, res){
    const keys = Object.keys(req.body)
  
    for(key of keys){
      if(req.body[key] == ""){
        return res.send('Please fill all fields!')
      }
    }

    Receipt.create(req.body, function(receipt){
      
      res.redirect(`recipes/${receipt.id}`)
    })
  },
    
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
      return res.send('Please, fill all fields');
    }

    Receipt.update(req.body, function() {
      return res.redirect(`receipts/${req.body.id}`)
    })
  },

  delete(req, res) {
    Receipt.delete(req.body.id, function() {
      return res.redirect(`/admin/receipts`)
    })
  }
}