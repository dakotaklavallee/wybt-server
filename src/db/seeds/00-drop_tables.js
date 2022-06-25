module.exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("avatars")
    .del()
    .then(() => knex("surveys").del())
    .then(() => knex("products").del())
    .then(() => knex("users").del())
    .then(() => knex("users_products").del());
};
