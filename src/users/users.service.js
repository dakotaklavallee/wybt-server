const knex = require("../db/connection.js");

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

module.exports = {
  list,
  read,
  update,
  create,
  destroy,
};
