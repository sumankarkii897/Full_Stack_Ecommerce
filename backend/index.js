const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")

const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const {connectDB} = require("./config/database")
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const blogRoutes = require("./routes/blogRoutes")
dotenv.config()

connectDB()
const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
const app = express()
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/blog", blogRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT} `);
    
})