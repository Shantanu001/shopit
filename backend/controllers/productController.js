const product = require("../models/product");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//create new product  => api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// get all the product list => api/v1/products?keyword=
exports.getProduct = catchAsyncError(async (req, res, nex) => {

  const countPerPage = 5;
  const totalCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
                                                    .search()
                                                    .filter()
                                                    .pagination(countPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    totalCount,
    products,
  });
});

// get product detail by id => api/v1/product/:id
exports.getProductById = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    next(new ErrorHandler("Product not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// update product => api/v1/admin/product/:id

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    next(new ErrorHandler("Product not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// delete product by id => api/v1/admin/product/:id

exports.deleteProductById = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    next(new ErrorHandler("Product not Found", 404));
  }

  product = await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Product has been deleted.",
    product,
  });
});

// delete all products => api/v1/admin/products

exports.deleteProducts = catchAsyncError(async (req, res, next) => {
  let products = await Product.find();
  if (products.length == 0) {
    next(new ErrorHandler("Product not Found", 404));
  }

  products = await Product.deleteMany();
  res.status(200).json({
    success: true,
    message: "Products has been deleted.",
    products,
  });
});
