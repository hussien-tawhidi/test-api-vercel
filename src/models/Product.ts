import mongoose, { Schema, Document, Model } from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
});


export interface IProduct extends Document {
  name: string;
  slug: string;
  feature: boolean;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  subcategories?: string[];
  brand: string;
  stock: number;
  banner: string;
  sku: string;
  features: string[];
  colors: { name: string; hex: string }[];
  ratings: number;
  images: { public_id: string; url: string }[];
  numOfReviews: number;
  sold: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isOnSale: boolean; // Virtual
  checkStock(quantity: number): boolean; // Instance method
}

const productSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, default: "" },
    banner: { type: String, default: "https://example.com" },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number },
    category: { type: String, required: true },
    subcategories: { type: [String], default: [] },
    features: { type: [String], default: [] },
    colors: [
      {
        name: { type: String, required: true, trim: true },
        hex: { type: String, required: true, trim: true },
      },
    ],
    brand: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    sku: { type: String, unique: true, required: true },
    ratings: { type: Number, default: 0 },
    feature: { type: Boolean, default: false },
    images: [imageSchema],
    numOfReviews: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.virtual("isOnSale").get(function () {
  return this.discountPrice !== undefined && this.discountPrice < this.price;
});

productSchema.pre("save", function (next) {
  if (!this.name) {
    return next(new Error("Name is required to generate a slug."));
  }
  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  next();
});

productSchema.methods.checkStock = function (quantity: number): boolean {
  return this.stock >= quantity;
};

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
