const { paginateResults } = require("./utils");

module.exports = {
    Query: {
        products: async (_, { pageSize = 20, after }, { dataSources }) => {
            const allProducts = await dataSources.ProductAPI.getAllProducts();
            // we want these in reverse chronological order
            allProducts.reverse();

            const products = paginateResults({
                after,
                pageSize,
                results: allProducts,
            });

            return {
                products,
                cursor: products.length ? products[products.length - 1].cursor : null,
                // if the cursor of the end of the paginated results is the same as the
                // last item in _all_ results, then there are no more results after this
                hasMore: products.length
                    ? products[products.length - 1].cursor !==
                    allProducts[allProducts.length - 1].cursor
                    : false,
            };
        },
        product: (_, { id }, { dataSources }) =>
            dataSources.ProductAPI.getProductById({ productId: id }),
        me: async (_, __, { dataSources }) =>
            dataSources.userAPI.findOrCreateUser(),
    },
    Mutation: {
        addProductsToWishlist: async (_, { productIds }, { dataSources }) => {
            const results = await dataSources.userAPI.addProductsToWishlist({ productIds });
            const products = await dataSources.ProductAPI.getProductsByIds({
                productIds,
            });

            return {
                success: results && results.length === productIds.length,
                message:
                    results.length === productIds.length
                        ? 'products added your wishlist successfully'
                        : `the following products couldn't be added: ${productIds.filter(
                            id => !results.includes(id),
                        )}`,
                products,
            };
        },
        removeProductFromWishlist: async (_, { productId }, { dataSources }) => {
            const result = dataSources.userAPI.removeProductFromWishlist({ productId });

            if (!result)
                return {
                    success: false,
                    message: 'failed to cancel trip',
                };

            const product = await dataSources.ProductAPI.getProductById({ productId });
            return {
                success: true,
                message: 'product removed from your wishlist',
                products: [product],
            };
        },
        login: async (_, { email }, { dataSources }) => {

            const user = await dataSources.userAPI.findOrCreateUser({ email });
            if (user) return new Buffer(email).toString('base64');
        },
    },
    Product: {
        isBooked: async (product, _, { dataSources }) =>
            dataSources.userAPI.isBookedOnWishlist({ productId: product.id }),
    },
    User: {
        wishlist: async (_, __, { dataSources }) => {
            // get ids of products by user
            const productIds = await dataSources.userAPI.getProductIdsByUser();

            if (!productIds.length) return [];

            // look up those launches by their ids
            return (
                dataSources.ProductAPI.getProductsByIds({
                    productIds,
                }) || []
            );
        },
    },
};
