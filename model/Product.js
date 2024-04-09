const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      min: [1, "wrong min price"],
      max: [500000, "wrong max price"],
    },
    discountPercentage: {
      type: Number,
      min: [0, "wrong min discount"],
      max: [99, "wrong max discount"],
    },

    stock: { type: Number, min: [0, "wrong min stock"], default: 0 },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },

    highlights: { type: String },
    discountPrice: { type: Number },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const virtualId = productSchema.virtual("id");
virtualId.get(function () {
  return this._id;
});
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  productSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Product = mongoose.model("Product", productSchema);
