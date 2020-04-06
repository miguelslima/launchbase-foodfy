const { date } = require('../../lib/utils')
const db = require('../../config/db');

module.exports = {
  all(callback) {

    db.query(
      `SELECT chefs.*, count(recipes) AS total_recipe
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
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
        name
      ) VALUES ($1)
      RETURNING id
    `

    const values = [
      data.name,
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
    db.query(`SELECT recipes.*, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
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