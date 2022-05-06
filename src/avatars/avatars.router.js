const router = require('express').Router();
const controller = require('./avatars.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:avatarId").get(controller.read).all(methodNotAllowed);

module.exports = router;