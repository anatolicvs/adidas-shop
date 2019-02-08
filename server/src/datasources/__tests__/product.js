const mongoose = require("mongoose")


var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect("mongodb://adidas:adidas06@ds125525.mlab.com:25525/adidas-products", { useNewUrlParser: true, options });
mongoose.connection.once('open', () => {
    console.log("connected to database.");
});

const ProductAPI = require("../product");

const ds = new ProductAPI();

describe('[ProductAPI.productReducer]', () => {
    it('properly transforms product', () => {
        expect(ds.productReducer(mockProductResponse)).toEqual(mockProduct);
    });
});

describe('[ProductAPI.getAllProducts]', () => {
    it('looks up launches from api', async () => {
        const res = await ds.getAllProducts();
        expect(res[0]).toEqual(mockProduct);
    });
});

describe('[ProductAPI.getProductById]', () => {
    it('should look up single product from api', async () => {
        let productId = `5c5cff2d404753a0f0fef698`;
        const res = await ds.getProductById({ productId });
        expect(res).toEqual(mockProduct);
    });
});
/*
describe('[ProductAPI.getProductsByIds]', () => {
    it('should call getProductById for each id', async () => {
        // temporarily overwrite getLaunchById to test
        const getLaunchById = ds.getProductById;
        let productId = `5c5cff2d404753a0f0fef698`;
        ds.getLaunchById = jest.fn(() => ({ productId }));

        const res = await ds.getProductsByIds({ productIds: ["5c5cff2d404753a0f0fef699", "5c5cff2d404753a0f0fef698"] });

        expect(res).toEqual([{ id: "5c5cff2d404753a0f0fef699" }, { id: "5c5cff2d404753a0f0fef698" }]);
        expect(ds.getLaunchById).toHaveBeenCalledTimes(2);

        // set getLaunchById back to default
        ds.getLaunchById = getLaunchById;
    });
}); */


/**
 * MOCK DATA BELOW
 */
const mockProduct = {
    id: "5c5cff2d404753a0f0fef698",
    imageUri: "https://www.adidas.com.tr/dis/dw/image/v2/aagl_prd/on/demandware.static/-/Sites-adidas-products/default/dw89ddacfc/zoom/DW9362_21_model.jpg?sw=230&sfrm=jpg",
    isBooked: false,
    name: "TAN Tape Clubhouse Eşofman Altı",
    title: "TAN Tape Clubhouse Eşofman Altı",
    price: 369,
    priceCurrency: "\r\n\t\t\t\t\t\t TL\r\n\t\t\t\t\t",
    isBooked: false
}

const mockProductResponse = {
    id: "5c5cff2d404753a0f0fef698",
    name: "TAN Tape Clubhouse Eşofman Altı",
    title: "TAN Tape Clubhouse Eşofman Altı",
    imageUri:
        "https://www.adidas.com.tr/dis/dw/image/v2/aagl_prd/on/demandware.static/-/Sites-adidas-products/default/dw89ddacfc/zoom/DW9362_21_model.jpg?sw=230&sfrm=jpg",
    price: 369,
    priceCurrency: "\r\n\t\t\t\t\t\t TL\r\n\t\t\t\t\t",
    isBooked: false
}
