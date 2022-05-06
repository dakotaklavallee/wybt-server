const service = require('./surveys.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res){
    const data = await service.list();
    res.json({data});
}

async function surveyExists(req, res, next){
    const { surveyId } = req.params;
    const foundSurvey = await service.read(surveyId);
    if (foundSurvey){
        res.locals.survey = foundSurvey;
        next();
    } else {
        next({status:404, message:"Survey Could Not Be Found."});
    }
}

function read(req, res){
    res.json({ data: res.locals.survey });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(surveyExists), read]
}