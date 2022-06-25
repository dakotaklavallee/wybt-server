const service = require("./users.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "username",
  "email",
  "avatar_id",
  "survey_done",
  "survey_index"
);
const hasValidNums = require("../errors/hasValidNums");
const hasRequiredValidNums = hasValidNums("points");

const VALID_PROPERTIES = [
  "user_id",
  "username",
  "email",
  "points",
  "survey_done",
  "avatar_id",
  "created_at",
  "updated_at",
  "survey_index",
  "redeemedPoints"
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function userExists(req, res, next) {
  const { userId } = req.params;
  const foundUser = await service.read(userId);
  if (foundUser) {
    res.locals.user = foundUser;
    next();
  } else {
    next({
      status: 404,
      message: "User Could Not Be Found.",
    });
  }
}

function read(req, res) {
  res.json({ data: res.locals.user });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const updatedUser = {
    ...req.body.data,
    user_id: res.locals.user.user_id,
  };
  const data = await service.update(updatedUser);
  res.json({ data });
}

async function updateAvatar(req, res) {
  console.log(req.body);
  const avatarId = req.body.data.avatar_id;
  const user = res.locals.user;
  const updatedUser = {
    ...user,
    avatar_id: avatarId,
  };
  const data = await service.update(updatedUser);
  res.json({ data });
}

async function destroy(req, res) {
  await service.delete(res.locals.user.user_id);
  res.sendStatus(204);
}

async function advanceUser(req, res) {
  const user = res.locals.user;
  const updatedUser = {
    ...user,
    survey_index: (user.survey_index + 1),
  };
  const data = await service.update(updatedUser);
  res.json({ data });
}

async function finishSurvey(req, res){
  const user = res.locals.user;
  const updatedUser = {
    ...user,
    survey_done: true,
  };
  console.log(updatedUser);
  const data = await service.update(updatedUser);
  res.json({ data });
}

async function addPoints(req, res){
  const user = res.locals.user;
  const updatedUser = {
    ...user,
    points: user.points + 1000,
  };
  console.log(updatedUser);
  const data = await service.update(updatedUser);
  res.json({ data });
}

async function redeemPoints(req, res){
  const user = res.locals.user;
  const updatedUser = {
    ...user,
    points: user.points - req.body.data.redeemedPoints,
  };
  console.log(updatedUser);
  const data = await service.update(updatedUser);
  res.json({ data });
}

async function getLikes(req, res){
  const user = res.locals.user
  const data = await service.listLikes(user.user_id);
  res.json({ data })
} 

async function addLike(req, res){
  const data = await service.addLike(req.body.data);
  res.status(201).json({ data });
}

async function removeLike(req, res){
  await service.removeLike(res.locals.user.user_id, req.body.data.product_id);
  res.sendStatus(204);
}


module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(userExists), read],
  getLikes: [asyncErrorBoundary(userExists), getLikes],
  create: [
    hasOnlyValidProperties,
    asyncErrorBoundary(create),
  ],
  addLike,
  update: [
    asyncErrorBoundary(userExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasRequiredValidNums,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(userExists), asyncErrorBoundary(destroy)],
  removeLike: [asyncErrorBoundary(userExists), asyncErrorBoundary(removeLike)],
  advanceUser: [
    asyncErrorBoundary(userExists),
    hasOnlyValidProperties,
    asyncErrorBoundary(advanceUser),
  ],
  updateAvatar: [
    asyncErrorBoundary(userExists),
    hasOnlyValidProperties,
    asyncErrorBoundary(updateAvatar),
  ],
  finishSurvey: [
    asyncErrorBoundary(userExists),
    hasOnlyValidProperties,
    asyncErrorBoundary(finishSurvey),
  ],
  addPoints: [
    asyncErrorBoundary(userExists),
    hasOnlyValidProperties,
    asyncErrorBoundary(addPoints),
  ],
  redeemPoints: [
    asyncErrorBoundary(userExists),
    hasOnlyValidProperties,
    asyncErrorBoundary(redeemPoints),
  ]
};
