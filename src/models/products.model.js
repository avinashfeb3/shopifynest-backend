import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "subCategory",
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    sizes: [
      {
        type: String,
        required: true,
      },
    ],
    gallery: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],
    isFeatured: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    status:{
        type: String,
        enum: ["Active", "Inactive"],
        default: "Inactive",
    },
  },
  { timestamps: true },
);
const products = mongoose.model("Product", productSchema);
export default products;