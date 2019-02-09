import React from 'react';
import {
    renderAdidas,
    cleanup,
    waitForElement,
} from '../../test-utils';
import Product, { GET_PRODUCT_DETAILS } from '../product';

const mockProduct = {
    __typename: 'Product',
    id: "5c5d273a404753b93ea1c71f",
    isBooked: true,
    name: "Manchester United Üçüncü Takım Forması",
    title: "Manchester United Üçüncü Takım Forması",
    imageUri: "https://www.adidas.com.tr/dis/dw/image/v2/aagl_prd/on/demandware.static/-/Sites-adidas-products/default/dw39b0fb65/zoom/DP6022_000_plp_model.jpg?sw=230&sfrm=jpg",
    isInCart: false,
};

describe('Product Page', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders product', async () => {
        const mocks = [
            {
                request: { query: GET_PRODUCT_DETAILS, variables: { productId: "5c5d273a404753b93ea1c71f" } },
                result: { data: { product: mockProduct } },
            },
        ];
        const { getByText } = await renderAdidas(<Product productId={"5c5d273a404753b93ea1c71f"} />, {
            mocks,
        });
        await waitForElement(() => getByText(/Remove from Wishlist/i));
    });
});
