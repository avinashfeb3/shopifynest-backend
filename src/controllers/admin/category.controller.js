import Category from "../../models/category.model.js";

// Create Category
const createCategory = async (req, res) => {
  try {
    // validate request
    const { name, status } = req.body;
    if ([name, status].some((field) => field.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "Name and status fields are required.",
        data: {},
      });
    }
    const category = await Category.create({ name, status });
    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to create category. Please try again later.",
      data: {},
    });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // validate request
    const { name, status } = req.body;
    if ([name, status].some((field) => field.trim() === "")) {
      return res.status(500).json({
        success: false,
        message: "Name and status fields are required.",
        data: {},
      });
    }
    const category = await Category.findByIdAndUpdate(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
        data: {},
      });
    }
    await Category.updateOne({ _id: id }, { name: name, status: status });
    const updatedCategory = await Category.findByIdAndUpdate(id);
    return res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to update category. Please try again later.",
      data: {},
    });
  }
};

// Get Categories
const getCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
        data: category,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category fetched successfully.",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to fetch category. Please try again later.",
      data: {},
    });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
        data: category,
      });
    }
    await Category.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to delete category. Please try again later.",
      data: {},
    });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully.",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to get all categories. Please try again later.",
      data: {},
    });
  }
};

export {
  createCategory,
  updateCategory,
  getCategories,
  deleteCategory,
  getAllCategories,
};
