const knex = require('../db/connection.js');

function list(){
    return knex("products")
    .select("*");
}

function read(productId){
    return knex("products")
    .select("*")
    .where({ product_id: productId })
    .first();
}

function update(updatedProduct){
    return knex("products")
    .select("*")
    .where({ product_id: updatedProduct.product_id })
    .update(updatedProduct, "*")
    .then(createdRecords => createdRecords[0]);
}

module.exports = {
    list,
    read,
    update,
}