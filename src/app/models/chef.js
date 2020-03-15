const { date } = require('../../lib/utils')
const db = require('../../config/db');

module.exports = {
  all(callback) {

    db.query(
      `SELECT chefs.*, count(receipts) AS total_recipe
      FROM chefs
      LEFT JOIN receipts ON (chefs.id = receipts.chef_id)
      GROUP BY chefs.id
      ORDER BY total_recipe ASC`, function(err, results){
      if(err) {
        throw `Database Error! ${err}`;
      }
      callback(results.rows);      
    })
  },
  create(data, callback) {
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      date(Date.now()).iso,
    ]

    db.query(query, values, function(err, results){
      if(err) {
        throw `Database Error! ${err}`;
      }
      
      callback(results.rows[0]);
    })
  },
  find(id, callback) {
    db.query(`SELECT * FROM chefs WHERE id = $1`, [id], function(err, results){
      if(err) {
        return res.send('Database error');
      }

      callback(results.rows[0]);
    })
  },
  findChefRecipe(id, callback){
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
      UPDATE chefs SET
        name=($1),
        avatar_url=($2)
      WHERE id = $3
    `

    const values = [
      data.name,
      data.avatar_url,
      data.id
    ]

    db.query(query, values, function(err, results){
      if(err){
        throw `Database Error! ${err}`;
      }
      callback();

    })
  },
  delete(id, callback){
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results){
      if(err) {
        throw `Database Error! ${err}`;
      }

      return callback();
    })
  }
}