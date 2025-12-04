exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('DELETE FROM images');

  // Inserts seed entries
  await knex.raw(`
    INSERT INTO images (filename, path) VALUES
    ('example1.jpg', 'uploads/example1.jpg'),
    ('example2.jpg', 'uploads/example2.jpg'),
    ('example3.jpg', 'uploads/example3.jpg');
  `);
};