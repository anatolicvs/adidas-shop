import React from 'react';

import {
    renderAdidas,
    cleanup,
    fireEvent,
    waitForElement,
} from '../../test-utils';
import AddProducts, { ADD_PRODUCTS_TO_WISHLIST, GET_PRODUCT } from '../add-product';

const mockProduct = {
    __typename: 'Product',
    id: "5c5d273a404753b93ea1c71f",
    name: "Manchester United Üçüncü Takım Forması",
    title: "Manchester United Üçüncü Takım Forması",
    imageUri: "https://www.adidas.com.tr/dis/dw/image/v2/aagl_prd/on/demandware.static/-/Sites-adidas-products/default/dw39b0fb65/zoom/DP6022_000_plp_model.jpg?sw=230&sfrm=jpg",
    isBooked: true
};

describe('add products to wishlist', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        const { getByTestId } = renderAdidas(<AddProducts cartItems={[]} />);
        expect(getByTestId('book-button')).toBeTruthy();
    });

    it('completes mutation and shows message', async () => {
        let mocks = [
            {
                request: { query: ADD_PRODUCTS_TO_WISHLIST, variables: { productIds: ["5c5d273a404753b93ea1c71f"] } },
                result: {
                    data: {
                        AddProducts: [{ success: true, message: 'success!', products: [] }],
                    },
                },
            },
            {
                // we need this query for refetchQueries
                request: { query: GET_PRODUCT, variables: { productId: "5c5d273a404753b93ea1c71f" } },
                result: { data: { product: mockProduct } },
            },
        ];
        const { getByTestId } = renderAdidas(
            <AddProducts cartItems={["5c5d273a404753b93ea1c71f"]} />,
            { mocks, addTypename: false },
        );

        fireEvent.click(getByTestId('book-button'));

        // Let's wait until our mocked mutation resolves and
        // the component re-renders.
        // getByTestId throws an error if it cannot find an element with the given ID
        // and waitForElement will wait until the callback doesn't throw an error
        await waitForElement(() => getByTestId('book-button'));
    });

    // >>>> TODO
    it('correctly updates cache', () => { });
});
