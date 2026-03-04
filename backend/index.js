const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")
const {connectDB} = require("./config/database")
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const blogRoutes = require("./routes/blogRoutes")
dotenv.config()

connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/blog", blogRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT} `);
    
})