import React from 'react';

import {
    renderAdidas,
    cleanup,
    waitForElement,
} from '../../test-utils';
import CartItem, { GET_PRODUCT } from '../cart-item';

const mockProduct = {
    __typename: 'Product',
    id: "5c5d273a404753b93ea1c71f",
    name: "Manchester United Üçüncü Takım Forması",
    title: "Manchester United Üçüncü Takım Forması",
    imageUri: "https://www.adidas.com.tr/dis/dw/image/v2/aagl_prd/on/demandware.static/-/Sites-adidas-products/default/dw39b0fb65/zoom/DP6022_000_plp_model.jpg?sw=230&sfrm=jpg",
    isBooked: true
};

describe('cart item', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('queries item and renders without error', () => {
        let mocks = [
            {
                request: { query: GET_PRODUCT, variables: { productId: "5c5d273a404753b93ea1c71f" } },
                result: { data: { product: mockProduct } },
            },
        ];

        // since we know the name of the mission, and know that name
        // will be rendered at some point, we can use getByText
        const { getByText } = renderAdidas(<CartItem productId={"5c5d273a404753b93ea1c71f"} />, {
            mocks,
            addTypename: false,
        });

        // check the loading state
        getByText(/loading/i);

        return waitForElement(() => getByText(/Manchester United Üçüncü Takım Forması/i));
    });

    it('renders with error state', () => {
        let mocks = [
            {
                request: { query: GET_PRODUCT, variables: { productId: "5c5d273a404753b93ea1c71f" } },
                error: new Error('aw shucks')
            },
        ];

        // since we know the error message, we can use getByText
        // to recognize the error
        const { getByText } = renderAdidas(<CartItem productId={"5c5d273a404753b93ea1c71f"} />, {
            mocks,
            addTypename: false,
        });

        waitForElement(() => getByText(/error: aw shucks/i));
    });
});
