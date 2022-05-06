exports.up = function(knex) {
  return knex.schema.createTable("products", (table) => {
      table.increments("product_id").primary();
      table.string("product_name");
      table.text("product_description");
      table.string("product_img");
      table.integer("said_yes");
      table.integer("said_no");
      table.integer("survey_id")
      .unsigned()
      .notNullable();
      table
      .foreign("survey_id")
      .references("survey_id")
      .inTable("surveys")
      .onDelete("cascade");
      table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("products");
};
