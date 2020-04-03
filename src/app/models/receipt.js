const { date } = require('../../lib/utils')
const db = require('../../config/db');

module.exports = {
  all(callback) {

    db.query(
      `SELECT receipts.*, count(chefs) AS total_recipe
      FROM receipts
      LEFT JOIN chefs ON (receipts.id = chefs.id)
      GROUP BY receipts.id
      ORDER BY total_recipe ASC`, function(err, results){
      if(err) {
        throw `Database Error! ${err}`;
      }
      callback(results.rows);      
    })
  },
  create(data, callback) {
    const query = `
      INSERT INTO receipts (
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at,
        chef_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
      data.chef
    ]
    
    db.query(query, values, function(err, results){
      if(err) {
        throw `Database Error! ${err}`;
      }
      
      callback(results.rows[0]);
    })
  },
  find(id, callback) {
    db.query(`
      SELECT receipts.*, chefs.name AS chef_name
      FROM receipts
      LEFT JOIN chefs on (receipts.chef_id = chefs.id)
      WHERE receipts.id = $1`, [id], function(err, results){

      if(err) {
        throw `Database Error! ${err}`;
      }

      callback(results.rows[0]);
    })
  },
  findRecipe(id, callback){
    db.query(`SELECT receipts.*, chefs.name AS chef_name
    FROM receipts
    LEFT JOIN chefs ON (receipts.chef_id = chefs.id)
    WHERE chefs.id = $1`, [id], function(err, results){
      if(err) throw `Database Error! ${err}`
      callback(results.rows)
    })
    
  },
  update(data, callback){
    const query = `
      UPDATE receipts SET
        image($1),
        title($2),
        ingredients($3),
        preparation($4),
        information($5),
        chef_id($6)
      WHERE id = $7
    `

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.prepatation,
      data.information,
      chef_id,
    ]

    db.query(query, values, function(err, results){
      if(err){
        throw `Database Error! ${err}`;
      }
      callback();

    })
  },
  delete(id, callback){
    db.query(`DELETE FROM receipts WHERE id = $1`, [id], function(err, results){
      if(err) {
        throw `Database Error! ${err}`;
      }

      return callback();
    })
  }
}