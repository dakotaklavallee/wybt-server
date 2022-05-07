const knex = require("../db/connection.js");
const reduceProperties = require("../utils/reduce-properties");

const addProducts = reduceProperties("survey_id", {
  product_id: ["products", null, "product_id"],
  product_name: ["products", null, "product_name"],
  product_description: ["products", null, "product_description"],
  product_img: ["products", null, "product_img"],
  said_yes: ["products", null, "said_yes"],
  said_no: ["products", null, "said_no"],
  created_at: ["products", null, "created_at"],
  updated_at: ["products", null, "updated_at"],
});

function list() {
  return knex("surveys as s")
  .join("products as p", "s.survey_id", "p.survey_id")
  .select("s.*", "p.*")
  .then(addProducts);
}

function read(surveyId) {
  return knex("surveys").select("*").where({ survey_id: surveyId }).first();
}

module.exports = {
  list,
  read,
};
