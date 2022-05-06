const knex = require("../db/connection");

function read(avatarId) {
    return knex("avatars").select("*").where({ avatar_id: avatarId }).first();
  }

function list(){
    return knex("avatars").select("*");
}

module.exports = {
    read,
    list,
}