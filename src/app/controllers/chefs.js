exports.index = function (req, res) {

  return res.render("chef/index")
}

exports.create = function(req, res){
  return res.send("Create")
}

exports.show = function(req, res){
  return res.send("Show")
}

exports.edit = function(req, res){
  return res.send("Edit")
}

exports.post = function(req, res){
  return res.send("Post")
  }
  
exports.put = function(req, res) {
  return res.send("Put")
}

exports.delete = function(req, res) {
  return res.send("Delete")
}
