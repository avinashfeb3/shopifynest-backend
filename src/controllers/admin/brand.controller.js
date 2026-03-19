import Brand from "../../models/brand.model.js";

// Create Brand
const createBrand = async (req, res) => {
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
    const brand = await Brand.create({ name, status });
    return res.status(201).json({
      success: true,
      message: "Brand created successfully.",
      data: {
        brand,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to create brand. Please try again later.",
      data: {},
    });
  }
};

// Update Brand
const updateBrand = async (req, res) => {
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
    const brand = await Brand.findByIdAndUpdate(id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found.",
        data: {},
      });
    }
    await Brand.updateOne({ _id: id }, { name: name, status: status });
    const updatedBrand = await Brand.findByIdAndUpdate(id);
    return res.status(200).json({
      success: true,
      message: "Brand updated successfully.",
      data: {
        updatedBrand,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to update brand. Please try again later.",
      data: {},
    });
  }
};

// Get Brand
const getBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found.",
        data: brand,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Brand fetched successfully.",
      data: brand,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to fetch brand. Please try again later.",
      data: {},
    });
  }
};

// Delete Brand
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found.",
        data: brand,
      });
    }
    await Brand.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Brand deleted successfully.",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to delete brand. Please try again later.",
      data: {},
    });
  }
};


// Get All Brands
const getAllBrand = async (req, res) => {
  try {
    const brands = await Brand.find();
    return res.status(200).json({
      success: true,
      message: "Brands fetched successfully.",
      data: brands,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to get all brands. Please try again later.",
      data: {},
    });
  }
};

export {
    createBrand,
    updateBrand,
    getBrand,
    deleteBrand,
    getAllBrand,
}