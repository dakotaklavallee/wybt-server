exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
      table.increments("user_id").primary();
      table.string("username");
      table.string("email");
      table.integer("points");
      table.boolean("survey_done");
      table.integer("avatar_id")
      .unsigned()
      .notNullable();
      table.foreign("avatar_id")
      .references("avatar_id")
      .inTable("avatars")
      .onDelete("cascade");
      table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
