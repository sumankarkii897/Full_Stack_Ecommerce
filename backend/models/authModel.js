const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique : true,
        min : 3,
    },
    email : {
        type: String,
        required : true,
        unique : true,
        pattern : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password : {
type : String,
required : true,
min : 8,
    }
    }
)

module.exports = mongoose.model("User", userSchema);