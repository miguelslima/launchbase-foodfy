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
      UPDATE instructors SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        gender=($4),
        services=($5)
      WHERE id = $6
    `

    const values = [
      data.avatar_url,
      data.nome,
      date(dataa.birth).iso,
      data.gender,
      data.services,
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
    db.query(`DELETE FROM instructors WHERE id = $1`, [id], function(err, results){
      if(err) {
        throw `Database Error! ${err}`;
      }

      return callback();
    })
  },
  paginate(params){

    const { filter, limit, offset, callback } = params;

    let query = "",
        filterQuery = "",
        totalQuery = `(
          SELECT count(*) FROM instructors
        ) AS total`

    if( filter ) {

      filterQuery = `
      WHERE instructors.name ILIKE '%${filter}%'
      OR instructors.services ILIKE '%${filter}%'
      `

      totalQuery = `(
        SELECT count(*) FROM instructors
        ${filterQuery}
      ) as total`
    }

    query = `
      SELECT instructors.*, ${totalQuery} , count(members) as total_students 
      FROM instructors
      LEFT JOIN members ON (instructors.id = members.instructor_id)
      ${filterQuery}
      GROUP BY instructors.id LIMIT $1 OFFSET $2
    `

    db.query(query, [limit, offset], function(err, results){
      if(err) {
        throw `Database Error! ${err}`;
      }

      return callback(results.rows);
    })
  }
}