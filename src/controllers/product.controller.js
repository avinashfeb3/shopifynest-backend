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

// Get Product
 const getProduct = async(req, res) => {
    try {
        const {category, subCategory, brand, price} = req.query
        let filter = {}
        const priceMap={
            "under-9999" : { $lt: 9999 },
            "9999-11999" : { $gte: 9999, $lte: 11999 },
            "Above 15000" : { $gt: 15000 },
        }
        
        // filter by category
        if (category) {
            filter.category = category
        }

        // filter by subCategory
        if (subCategory) {
            filter.subCategory = {
                $in: subCategory.split(",")
            }
        }

        // filter by brand
        if (brand) {
            filter.brand = {
                $in: brand.split(",")
            }
        }

        // filter by price
        if (price) {
            filter.price = priceMap[price]
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: { products: products }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Error retrieving product"
        })
    }
 }

export {latestProducts, featuredProducts, getProduct}