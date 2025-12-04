exports.up = async function(knex) {
  await knex.raw(`
    CREATE TABLE images (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) NOT NULL,
      path VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = async function(knex) {
  await knex.raw('DROP TABLE images;');
};