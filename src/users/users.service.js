const knex = require("../db/connection.js");
const reduceProperties = require('../utils/reduce-properties');
const addProducts = reduceProperties("product_id", {
  product_id: ["products", null, "product_id"],
  product_name: ["products", null, "product_name"],
  product_img: ["products", null, "product_img"],
  product_description: ["products", null, "product_description"],
  said_yes: ["products", null, "said_yes"],
  said_no: ["products", null, "said_no"],
  survey_id: ["products", null, "survey_id"],
  created_at: ["products", null, "created_at"],
  updated_at: ["products", null, "updated_at"],
});

function list() {
  return knex("users").select("*");
}

function read(userId) {
  return knex("users").select("*").where({ user_id: userId }).first();
}

function update(updatedUser) {
  return knex("users")
    .select("*")
    .where({ user_id: updatedUser.user_id })
    .update(updatedUser, "*")
    .then((createdRecords) => createdRecords[0]);
}

function create(user) {
  return knex("users")
    .insert(user)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function destroy(user_id) {
  return knex("users").where({ user_id }).del();
}

function listLikes(user_id){
  return knex("users as u")
  .join("users_products as up", "u.user_id", "up.user_id")
  .join("products as p", "up.product_id", "p.product_id")
  .select("u.*", "up.*", "p.*")
  .where({ "u.user_id": user_id })
  .then(addProducts)
}

function addLike(newLike){
  return knex("users_products")
  .insert(newLike)
  .returning("*")
  .then((createdRecords) => createdRecords[0]);
}

function removeLike(user_id, product_id){
  return knex("users_products")
  .where({ user_id })
  .where({ product_id })
  .del();
}

module.exports = {
  list,
  read,
  update,
  create,
  destroy,
  listLikes,
  addLike,
  removeLike,
};
