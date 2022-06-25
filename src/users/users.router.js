const router = require('express').Router();
const controller = require('./users.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
.route("/")
.get(controller.list)
.post(controller.create)
.all(methodNotAllowed);

router
.route("/:userId")
.get(controller.read)
.put(controller.update)
.delete(controller.delete)
.all(methodNotAllowed);

router
.route("/:userId/advance")
.put(controller.advanceUser)
.all(methodNotAllowed);

router
.route("/:userId/avatar")
.put(controller.updateAvatar)
.all(methodNotAllowed);

router
.route("/:userId/finishSurvey")
.put(controller.finishSurvey)
.all(methodNotAllowed);

router
.route("/:userId/points")
.put(controller.addPoints)
.delete(controller.redeemPoints)
.all(methodNotAllowed);

router
.route("/:userId/likes")
.get(controller.getLikes)
.post(controller.addLike)
.delete(controller.removeLike)
.all(methodNotAllowed);

module.exports = router;