const router = require('express').Router();
const controller = require('./surveys.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:surveyId").get(controller.read).all(methodNotAllowed);

module.exports = router;