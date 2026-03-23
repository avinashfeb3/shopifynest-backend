import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../../helpers/cloudinary.js";
import products from "../../models/products.model.js";

// Get Products
const getProducts = async (req, res) => {
  try {
    const allProducts = await products.find().populate("category");
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      data: { products: allProducts },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to fetch products. Please try again later.",
      data: {},
    });
  }
};

// Get Product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await products.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
        data: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully.",
      data: { product },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to fetch product. Please try again later.",
      data: {},
    });
  }
};

// Create Product
const createProduct = async (req, res) => {
  try {
    // validate request
    const {
      name,
      category,
      subcategory,
      brand,
      price,
      discount_price,
      qty,
      sku,
      description,
      sizes,
      is_featured,
      status,
    } = req.body;

    if (
      !name ||
      name.trim() === "" ||
      !category ||
      category.trim() === "" ||
      !price ||
      !qty ||
      !sku ||
      sku.trim() === "" ||
      !sizes ||
      (typeof sizes === "string" && sizes.trim() === "")
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, category, price, qty, sku fields are required.",
        data: {},
      });
    }

    // sizes of the products
    const sizesArray = sizes
      ? typeof sizes === "string"
        ? sizes.split(",")
        : sizes
      : [];

    // handle image uploads
    const gallery = [];
    if (req?.files) {
      for (const file of req?.files) {
        if (file?.path) {
          const response = await uploadImageToCloudinary(file.path);
          if (
            response &&
            (response.secure_url || response.url) &&
            response.public_id
          ) {
            gallery.push({
              url: response.secure_url || response.url,
              publicId: response.public_id,
            });
          }
        }
      }
    }

    const finalSubcategory =
      subcategory === "null" || subcategory === "undefined" || !subcategory
        ? null
        : subcategory;
    const finalBrand =
      brand === "null" || brand === "undefined" || !brand ? null : brand;

    // store data in the database
    const product = await products.create({
      name,
      category,
      subcategory: finalSubcategory,
      brand: finalBrand,
      description,
      sku,
      price,
      discountPrice: discount_price,
      quantity: qty,
      status: status
        ? status.charAt(0).toUpperCase() + status.slice(1)
        : "Inactive",
      isFeatured: is_featured
        ? is_featured.charAt(0).toUpperCase() + is_featured.slice(1)
        : "No",
      sizes: sizesArray,
      gallery,
    });
    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: { product },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to create product. Please try again later.",
      data: {},
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // validate request
    const {
      name,
      category,
      subcategory,
      brand,
      price,
      discount_price,
      qty,
      sku,
      description,
      sizes,
      is_featured,
      status,
    } = req.body;

    // check if the product exists
    const productExists = await products.findById(id);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
        data: {},
      });
    }

    // sizes of the products
    const sizesArray = sizes
      ? typeof sizes === "string"
        ? sizes.split(",")
        : sizes
      : [];

    const finalSubcategory =
      subcategory === "null" || subcategory === "undefined" || !subcategory
        ? null
        : subcategory;
    const finalBrand =
      brand === "null" || brand === "undefined" || !brand ? null : brand;

    await products.updateOne(
      { _id: id },
      {
        $set: {
          name,
          category,
          subcategory: finalSubcategory,
          brand: finalBrand,
          description,
          sku,
          price,
          discountPrice: discount_price,
          quantity: qty,
          status: status
            ? status.charAt(0).toUpperCase() + status.slice(1)
            : "Inactive",
          isFeatured: is_featured
            ? is_featured.charAt(0).toUpperCase() + is_featured.slice(1)
            : "No",
          sizes: sizesArray,
        },
      },
    );

    // update product data in the database
    const product = await products.findById(id);

    return res.status(201).json({
      success: true,
      message: "Product updated successfully.",
      data: { product },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to update product. Please try again later.",
      data: {},
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // check if the product exists
    const product = await products.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
        data: {},
      });
    }

    // first delete the images from cloudinary
    if (product.gallery) {
      for (const image of product.gallery) {
        const public_id = image?.publicId;
        await deleteImageFromCloudinary(public_id);
      }
    }

    // delete the product from the database
    await products.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to delete product. Please try again later.",
    });
  }
};

// Update Product Image
const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await products.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
        data: {},
      });
    }
    const filePath = req?.files?.[0]?.path;
    if (!filePath) {
      return res.status(400).json({
        success: false,
        message: "No image file provided.",
        data: {},
      });
    }
    const response = await uploadImageToCloudinary(filePath);
    product.gallery.push({
      publicId: response.public_id,
      url: response?.url,
    });
    await product.save();
    return res.status(200).json({
      success: true,
      message: "Product gallery updated successfully.",
      data: { product },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to update product gallery. Please try again later.",
      data: {},
    });
  }
};

// Delete Product Image
const deleteProductImage = async (req, res) => {
  try {
      const { id, public_id } = req.params;
        const product = await products.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
        data: {},
      });
    }

    const fileExists = product.gallery.some((img) => img.publicId === public_id);
    if(!fileExists){
       return res.status(404).json({ 
        success: false,
        message: "Image not found in product gallery.",
        data: {},
       });
    }

    await deleteImageFromCloudinary(public_id);
    product.gallery = product.gallery.filter((img) => img.publicId !== public_id);
    await product.save();
    
    return res.status(200).json({
      success: true,
      message: "Product image deleted successfully.",
      data: { product },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to update product gallery. Please try again later.",
      data: {},
    });
  }
}

export {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  updateGallery,
  deleteProductImage,
};
