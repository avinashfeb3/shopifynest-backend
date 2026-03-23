import Product from "../models/products.model.js"

// Latest Products
const latestProducts = async(req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(5)
        return res.status(200).json({
            success: true,
            message: "Latest products retrieved successfully",
            data: {products: products}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message ||"Error retrieving latest products"
        })
    }
}

// Featured Products
const featuredProducts = async(req, res) => {
    try {
        const products = await Product.find({ isFeatured: "Yes" }).sort({ createdAt: -1 }).limit(5)
        return res.status(200).json({
            success: true,
            message: "Featured products retrieved successfully",
            data: {products: products}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message ||"Error retrieving featured products"
        })
    }
}

export {latestProducts, featuredProducts}