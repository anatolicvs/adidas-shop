const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    title: String,
    imageUri: String,
    price: Number,
    priceCurrency: String,
    isBooked: Boolean,
    dateModified: Date
});

module.exports = mongoose.model('Product', productSchema);


