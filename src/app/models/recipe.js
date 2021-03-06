const { date } = require('../../lib/utils')
const db = require('../../config/db');

module.exports = {
  all(){
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`)
  },
  create(data) {
    const query = `
      INSERT INTO recipes (
        title,
        ingredients,
        preparation,
        information,
        created_at,
        chef_id
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `

    const values = [
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
      data.chef.id
    ]
    
    return db.query(query, values);
  },
  find(id) {
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs on (chefs.id = recipes.chef_id)
      WHERE recipes.id = $1`, [id])
  },
  findBy(filter){
    return db.query(`
    SELECT recipes.*, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.title ILIKE '%${filter}%'`)
  },
  update(data){
    const query = `
    UPDATE recipes SET
      title=($1),
      ingredients=($2),
      preparation=($3),
      information=($4),
      chef_id=($5)
    WHERE id = $6
    `

    const values = [
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.chef,
      data.id
    ]

    return db.query(query, values);
  },
  delete(id, callback){
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results){
      if(err) {
        throw `Database Error! ${err}`;
      }

      return callback();
    })
  },
  chefsSelect(){
    return db.query(`SELECT name, id FROM chefs`)
      
  },
  files(id) {
      return db.query(`
          SELECT * FROM files WHERE recipe_id = $1
      `, [id])
  }
}