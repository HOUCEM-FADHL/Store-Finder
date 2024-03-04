const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [3, "{PATH} must be at least 3 characters long"]
    },
    number: {
        type: Number,
        required: [true, "{PATH} is required"],
        min : [0, "{PATH} must be greater than 0"],
        // unique: [true, "{PATH} must be unique"]
    },
    isOpen: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model("Store", StoreSchema)
