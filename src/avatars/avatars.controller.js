const service = require('./avatars.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function avatarExists(req, res, next){
    const {avatarId} = req.params;
    const foundAvatar = await service.read(avatarId);
    if (foundAvatar){
        res.locals.avatar = foundAvatar;
        next();
    }else{
        next({status:404, message:"Avatar Could Not Be Found."});
    }
}

function read(req, res, next){
    res.json({data: res.locals.avatar});
}

async function list(req, res, next){
    const data = await service.list();
    res.json({data});
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(avatarExists), read],
}