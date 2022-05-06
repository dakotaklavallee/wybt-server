exports.up = function(knex) {
  return knex.schema.createTable("avatars", (table) => {
      table.increments("avatar_id").primary();
      table.string("avatar_url");
      table.string("avatar_name");
      table.timestamps(true, true);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("avatars");
};
