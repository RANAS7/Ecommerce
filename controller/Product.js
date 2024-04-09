const { Product } = require("../model/Product");

// this product we have to get from API body
exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      highlights: req.body.highlights,
      brand: req.body.brand,
      category: req.body.category,
      price: req.body.price,
      discountPercentage: req.body.discountPercentage,
      stock: req.body.stock,
      // Assuming rating is a required field and set to default value
      // Access files as req.files.fieldName
      // Assuming single file per field, modify accordingly if expecting multiple files
      thumbnail: req.files.thumbnail ? req.files.thumbnail[0].filename : null,
      image1: req.files.image1 ? req.files.image1[0].filename : null,
      image2: req.files.image2 ? req.files.image2[0].filename : null,
      image3: req.files.image3 ? req.files.image3[0].filename : null,
      // Other fields as needed...
    });

    // You can handle other operations like calculating discountPrice here
    product.discountPrice = Math.round(
      product.price * (1 - product.discountPercentage / 100)
    );
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  let condition = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  }

  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  console.log(req.query.category);

  if (req.query.category) {
    query = query.find({ category: { $in: req.query.category.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      category: { $in: req.query.category.split(",") },
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: { $in: req.query.brand.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      brand: { $in: req.query.brand.split(",") },
    });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.count().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

// this product we have to get from API body

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const existingProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Recalculate discount price
    existingProduct.discountPrice = Math.round(
      existingProduct.price * (1 - existingProduct.discountPercentage / 100)
    );

    res.status(200).json(existingProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(400).json({ error: "Failed to update product" });
  }
};

exports.fetchRelatedProducts = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the current product by ID
    const product = await Product.findById(id);

    // Fetch related products based on brand or category
    const relatedProducts = await Product.find({
      $or: [
        { brand: product.brand }, // Find products with the same brand
        { category: product.category }, // Find products with the same category
      ],
      _id: { $ne: product._id }, // Exclude the current product from the results
    }).limit(5); // Limit the number of related products returned

    res.status(200).json(relatedProducts);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(204).send(); // Send a successful response with no content
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.fetchRelatedProducts = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the current product by ID
    const product = await Product.findById(id);

    // Fetch related products based on brand or category
    const relatedProducts = await Product.find({
      $or: [
        { brand: product.brand }, // Find products with the same brand
        { category: product.category }, // Find products with the same category
      ],
      _id: { $ne: product._id }, // Exclude the current product from the results
    }).limit(5); // Limit the number of related products returned

    res.status(200).json(relatedProducts);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(204).send(); // Send a successful response with no content
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
