const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    title: String,
    imageUri: String,
    price: Number,
    priceCurrency: String,
    isBooked: Boolean
});

module.exports = mongoose.model('product_document', ProductSchema);
