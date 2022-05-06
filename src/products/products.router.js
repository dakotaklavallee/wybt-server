const router = require("express").Router();
const controller = require('./products.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route("/")
.get(controller.list)
.all(methodNotAllowed);

router
.route("/:productId")
.get(controller.read)
.put(controller.update)
.all(methodNotAllowed);

module.exports = router;