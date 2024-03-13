import asyncHandler from "express-async-handler";
import Category from "../model/categoryModel.js";

// @desc   Create Category (Admin Only)
// @route  POST /api/categories
// @access Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const newCaTegory = new Category({
    user: req.user.id,
    name: req.body.name,
    photo: req.body.photo,
  });

  const saveCategory = await newCaTegory.save();

  res.status(201).json(saveCategory);
});

// @desc   Get all Categories
// @route  GET /api/categories
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  if (!categories) {
    res.status(404).json("Categories not found");
  } else {
    res.json(categories);
  }
});
// @desc   Get Category by ID
// @route  GET /api/categories/:id
// @access Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404).json("Category not found");
  } else {
    res.json(category);
  }
});

// @desc   Update Category (Admin Only)
// @route  PUT /api/categories/:id
// @access Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404).json("Category not found");
  } else {
    category.name = req.body.name || category.name;
    category.photo = req.body.photo || category.photo;
  }

  await category.save();
  res.status(200).json(category);
});

// @desc   Delete Category (Admin Only)
// @route  DELETE /api/categories/:id
// @access Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404).json("Category not found");
  }

  await category.remove();
  res.status(200).json("Category deleted");
});

export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
