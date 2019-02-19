const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');

class UserAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.context = config.context;
    }

    /**
      * User can be called with an argument that includes email, but it doesn't
      * have to be. If the user is already on the context, it will use that user
      * instead
      */
    async findOrCreateUser({ email: emailArg } = {}) {

        const email = this.context && this.context.user ? this.context.user.email : emailArg;

        console.log(email);

        if (!email || !isEmail.validate(email)) return null;

        const users = await this.store.users.findOrCreate({ where: { email } });
        return users && users[0] ? users[0] : null;
    }

    async addProductsToWishlist({ productIds }) {
        const userId = this.context.user.id;
        if (!userId) return;

        let results = [];

        for (const productId of productIds) {
            const res = await this.addProductToWishlist({ productId });
            if (res) results.push(res);
        }

        return results;
    }

    async addProductToWishlist({ productId }) {
        const userId = this.context.user.id;
        const res = await this.store.wishlist.findOrCreate({
            where: { userId, productId },
        });
        return res && res.length ? res[0].get() : false;
    }

    async removeProductFromWishlist({ productId }) {
        const userId = this.context.user.id;
        return !!this.store.wishlist.destroy({ where: { userId, productId } });
    }

    async getProductIdsByUser() {
        const userId = this.context.user.id;
        const found = await this.store.wishlist.findAll({
            where: { userId },
        });
        return found && found.length
            ? found.map(l => l.dataValues.productId).filter(l => !!l)
            : [];
    }

    async isBookedOnWishlist({ productId }) {
        if (!this.context || !this.context.user) return false;
        const userId = this.context.user.id;
        const found = await this.store.wishlist.findAll({
            where: { userId, productId },
        });
        return found && found.length > 0;
    }
}

module.exports = UserAPI;

