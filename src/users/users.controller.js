const service = require("./users.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "username",
  "email",
  "avatar_id",
  "survey_done"
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

async function destroy(req, res) {
    await service.delete(res.locals.user.user_id);
    res.sendStatus(204);
  }

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(userExists), read],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  update: [
      asyncErrorBoundary(userExists),
      hasOnlyValidProperties,
      hasRequiredProperties,
      hasRequiredValidNums,
      asyncErrorBoundary(update),
  ],
  delete: [
      asyncErrorBoundary(userExists),
      asyncErrorBoundary(destroy),
  ],
};
