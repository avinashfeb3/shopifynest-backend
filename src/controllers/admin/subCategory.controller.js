import SubCategory from "../../models/subCategory.model.js";

// Create SubCategory
const createSubCategory = async (req, res) => {
  try {
    // validate request
    const { name, status, category } = req.body;
    if ([name, status, category].some((field) => field.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "Name, status and category fields are required.",
        data: {},
      });
    }
    const subcategory = await SubCategory.create({ name, status, category });
    return res.status(201).json({
      success: true,
      message: "SubCategory created successfully.",
      data: subcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to create subCategory. Please try again later.",
      data: {},
    });
  }
};

// Update Category
const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // validate request
    const { name, status, category } = req.body;
    if ([name, status, category].some((field) => field.trim() === "")) {
      return res.status(500).json({
        success: false,
        message: "Name, status and category fields are required.",
        data: {},
      });
    }
    const subcategory = await SubCategory.findByIdAndUpdate(id);
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "subCategory not found.",
        data: {},
      });
    }
    await SubCategory.updateOne(
      { _id: id },
      { name: name, status: status, category: category }
    );
    const updatedSubCategory = await SubCategory.findById(id);
    return res.status(200).json({
      success: true,
      message: "SubCategory updated successfully.",
      data: updatedSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to update subCategory. Please try again later.",
      data: {},
    });
  }
};

// Get subCategories
const getSubCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await SubCategory.findById(id);
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found.",
        data: subcategory,
      });
    }
    return res.status(200).json({
      success: true,
      message: "SubCategory fetched successfully.",
      data: subcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to fetch subcategory. Please try again later.",
      data: {},
    });
  }
};

// Delete Category
const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await SubCategory.findById(id);
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found.",
        data: subcategory,
      });
    }
    await SubCategory.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "SubCategory deleted successfully.",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to delete subcategory. Please try again later.",
      data: {},
    });
  }
};

// Get All Categories
const getAllSubCategories = async (req, res) => {
  try {
    const {category_id} = req.query;
    let filter = {};
    if(category_id){
      filter.category = category_id;
    }

    const subcategories = await SubCategory.find(filter).populate('category');
    return res.status(200).json({
      success: true,
      message: "SubCategories fetched successfully.",
      data: subcategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to get all subcategories. Please try again later.",
      data: {},
    });
  }
};

export {
  createSubCategory,
    updateSubCategory,
    getSubCategories,
    deleteSubCategory,
    getAllSubCategories,
};
