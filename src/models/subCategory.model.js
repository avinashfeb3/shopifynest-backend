import mongoose, {Schema} from "mongoose";


const subcategorySchema = new Schema(
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
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subcategorySchema);
export default SubCategory;
