const knex = require('../db/connection.js');

function list(){
    return knex("surveys").select('*');
}

function read(surveyId){
    return knex("surveys").select('*').where({ survey_id: surveyId }).first();
}

module.exports = {
    list,
    read,
}