const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../model/Product");

const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  fetchRelatedProducts,
  deleteProduct,
} = require("../controller/Product");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

router
  .post(
    "/",
    upload.fields([
      { name: "image1" },
      { name: "image2" },
      { name: "image3" },
      { name: "thumbnail" },
    ]),
    createProduct
  )
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch(
    "/:id",
    upload.fields([
      { name: "image1" },
      { name: "image2" },
      { name: "image3" },
      { name: "thumbnail" },
    ]),
    updateProduct
  )
  .get("/related-products", fetchRelatedProducts)
  .delete("/:id", deleteProduct);

exports.router = router;
