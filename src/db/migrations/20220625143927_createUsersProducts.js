exports.up = function (knex) {
  return knex.schema.createTable("users_products", (table) => {
    table.integer("product_id").unsigned().notNullable();
    table
      .foreign("product_id")
      .references("product_id")
      .inTable("products")
      .onDelete("CASCADE");
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");
    table.primary(["product_id", "user_id"]);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users_products");
};
