import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
    renderAdidas,
    cleanup,
    waitForElement,
} from '../../test-utils';
import Products, { GET_PRODUCTS } from '../products';

const mockProduct = {
    __typename: 'Product',
    id: "5c5d273a404753b93ea1c71f",
    isBooked: true,
    name: "Manchester United Üçüncü Takım Forması",
    title: "Manchester United Üçüncü Takım Forması",
    imageUri: "https://www.adidas.com.tr/dis/dw/image/v2/aagl_prd/on/demandware.static/-/Sites-adidas-products/default/dw39b0fb65/zoom/DP6022_000_plp_model.jpg?sw=230&sfrm=jpg",
    isInCart: false,
};

describe('Products Page', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders products', async () => {
        const cache = new InMemoryCache({ addTypename: false });
        const mocks = [
            {
                request: { query: GET_PRODUCTS },
                result: {
                    data: {
                        products: {
                            cursor: '123',
                            hasMore: true,
                            products: [mockProduct],
                        },
                    },
                },
            },
        ];
        const { getByText } = await renderAdidas(<Products />, {
            mocks,
            cache,
        });
        await waitForElement(() => getByText(/Manchester United Üçüncü Takım Forması/i));
    });
});
