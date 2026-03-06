const Product = require("../models/productModel");
const cloudinary = require("cloudinary").v2;
// exports.createProduct = async (req, res) => {
//   try {
//     const { image, name, description, price } = req.body;
//     const myCloud = await cloudinary.uploader.upload(image, {
//       folder: "products",
//       width: 300,
//       crop: "scale",
//     });
//     const product = await Product.create({
//       ...req.body,
//       image: {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url,
//       },
//     });
//     res.status(201).json({
//       message: "Product created successfully",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Product creation failed",
//       error: error.message,
//     });
//   }
// };
exports.createProduct = async (req, res) => {
  try {

    const image = req.files.image;

    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "products",
      width: 300,
      crop: "scale"
    });

    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      productCode: req.body.productCode,
      stock: req.body.stock,
      image: {
        public_id: result.public_id,
        url: result.secure_url
      }
    });

    res.status(201).json({
      success: true,
      product
    });

  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const priceFrom = parseFloat(req.query.priceFrom) || 0;
    const priceTo = parseFloat(req.query.priceTo) || 9999999;
    const category = req.query.category || "";
    const perPage = Math.max(parseInt(req.query.perPage) || 4,1);
    const page = Math.max(parseInt(req.query.page) || 1,1);
    let filter = {
      price : { $gte: priceFrom, $lte: priceTo},
      name : { $regex: searchTerm, $options: "i"},
    
    }
    if(category) {
      filter.category = category;
    }
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).limit(perPage).skip((page - 1) * perPage);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
      total,
      page,
      perPage,
      totalPages : Math.ceil(total/perPage)
    });
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: `Product with id ${productId} fetched successfully`,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};
