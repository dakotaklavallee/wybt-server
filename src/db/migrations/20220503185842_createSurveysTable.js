exports.up = function(knex) {
    return knex.schema.createTable("surveys", (table) => {
        table.increments("survey_id").primary();
        table.date("survey_date");
        table.string("survey_name");
        table.text("survey_description");
        table.timestamps(true, true);
    })
};


exports.down = function(knex) {
  return knex.schema.dropTable("surveys");
};
