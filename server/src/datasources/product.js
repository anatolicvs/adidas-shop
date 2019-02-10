const Product = require("../../model/ProductSchema");

class ProductAPI {
    constructor() {
    }
    // leaving this inside the class to make the class easier to test
    productReducer(product) {
        if (product)
            return {
                id: product.id == null ? "0" : product.id,
                name: product.name,
                title: product.title,
                imageUri: product.imageUri,
                price: product.price,
                priceCurrency: product.priceCurrency,
                isBooked: product.isBooked,
                cursor: product.cursor
            };
        else
            return null;
    }

    async getAllProducts() {
        const res = await Product.find({});

        // transform the raw launches to a more friendly
        return res && res.length ? res.map(l => this.productReducer(l)) : [];
    }

    async searchProducts({filter}) {

        const res = await Product.find({'name' : { '$regex' : filter, '$options' : 'i' }});

        return res && res.length ? res.map(l => this.productReducer(l)) : [];
    }

    async getProductById({ productId }) {
        const res = await Product.findById(productId);
        return this.productReducer(res);
    }

    async getProductsByIds({ productIds }) {
        return Promise.all(
            productIds.map(productId => this.getProductById({ productId }))
        );
    }

}

module.exports = ProductAPI;
