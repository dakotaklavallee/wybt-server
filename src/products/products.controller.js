const service = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasValidNums = require("../errors/hasValidNums");
const hasRequiredValidNums = hasValidNums("said_yes", "said_no");

const VALID_PROPERTIES = [
  "product_id",
  "product_name",
  "product_description",
  "product_img",
  "said_yes",
  "said_no",
  "survey_id",
  "created_at",
  "updated_at",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body

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

async function productExists(req, res, next) {
  const { productId } = req.params;
  const foundProduct = await service.read(productId);
  if (foundProduct) {
    res.locals.product = foundProduct;
    next();
  } else {
    next({ 
        status: 404, 
        message: "Product Could Not Be Found." 
    });
  }
}

function read(req, res) {
  res.json({ data: res.locals.product });
}

async function update(req, res) {
  const updatedProduct = {
    ...req.body.data,
    product_id: res.locals.product.product_id,
  };
  const data = await service.update(updatedProduct);
  res.json({ data });
}

async function updateYes(req, res) {
  const product = res.locals.product;
  const updatedProduct = {
    ...product,
    said_yes: (product.said_yes + 1)
  };
  const data = await service.update(updatedProduct);
  res.json({ data });
}

async function updateNo(req, res) {
  const product = res.locals.product;
  const updatedProduct = {
    ...product,
    said_no: (product.said_no + 1)
  };
  const data = await service.update(updatedProduct);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(productExists), read],
  update: [hasOnlyValidProperties, hasRequiredValidNums, asyncErrorBoundary(productExists), update],
  updateYes: [asyncErrorBoundary(productExists), hasOnlyValidProperties, hasRequiredValidNums, asyncErrorBoundary(updateYes)],
  updateNo: [asyncErrorBoundary(productExists), hasOnlyValidProperties, hasRequiredValidNums, asyncErrorBoundary(updateNo)],
};
