import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
    renderAdidas,
    cleanup,
    getByTestId,
    fireEvent,
    waitForElement,
    render,
} from '../../test-utils';
import ActionButton, {
    GET_PRODUCT_DETAILS,
    REMOVE_PRODUCT_FROM_WISHLIT,
    TOGGLE_CART,
} from '../action-button';
import { GET_CART_ITEMS } from '../../pages/cart';

const mockProduct = {
    __typename: 'Product',
    id: "5c5d273a404753b93ea1c71f",
    name: "Manchester United Üçüncü Takım Forması",
    title: "Manchester United Üçüncü Takım Forması",
    imageUri: "https://www.adidas.com.tr/dis/dw/image/v2/aagl_prd/on/demandware.static/-/Sites-adidas-products/default/dw39b0fb65/zoom/DP6022_000_plp_model.jpg?sw=230&sfrm=jpg",
    isBooked: true,
    isInCart: false,
};

describe('action button', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        const { getByTestId } = renderAdidas(<ActionButton />);
        expect(getByTestId('action-button')).toBeTruthy();
    });

    it('shows correct label', () => {
        const { getByText, container } = renderAdidas(<ActionButton />);
        getByText(/add to cart/i);

        // rerender with different props to same container
        renderAdidas(<ActionButton isInCart={true} />, { container });
        getByText(/remove from cart/i);

        // rerender with different props to same container
        renderAdidas(<ActionButton isBooked={true} />, { container });
        getByText(/Remove from Wishlis/i);
    });

    /**
     * This test is a bit tricky, since the button doesn't _render_
     * anything based on the response from the mutation.
     *
     * We test this by only mocking one mutation at a time. If the component
     * tried to execute any mutation not mocked, it would throw an
     * error
     */
    it('fires correct mutation with variables', async () => {
        const cache = new InMemoryCache();
        cache.writeQuery({
            query: GET_CART_ITEMS,
            data: { cartItems: [1] },
        });

        // if we only provide 1 mock, any other queries would cause error
        let mocks = [
            {
                request: { query: TOGGLE_CART, variables: { productId: "5c5d273a404753b93ea1c71f" } },
                result: { data: { addOrRemoveFromCart: true } }
            },
            {
                request: { query: GET_PRODUCT_DETAILS, variables: { productId: "5c5d273a404753b93ea1c71f" } },
                result: { data: { product: mockProduct } }
            },

        ];

        const { getByTestId, container, debug } = renderAdidas(
            <ActionButton id={"5c5d273a404753b93ea1c71f"} isBooked={false} />,
            {
                mocks,
                cache
            },
        );
        fireEvent.click(getByTestId('action-button'));
        await waitForElement(() => getByTestId('action-button'));

        // mocks = [
        //   {
        //     request: {
        //       query: CANCEL_TRIP,
        //       variables: { launchId: 1 },
        //     },
        //     result: {
        //       data: {
        //         cancelTrip: {
        //           success: true,
        //           message: '',
        //           launches: [{ id: 1, isBooked: false }],
        //         },
        //       },
        //     },
        //   },
        // ];

        // renderAdidas(<ActionButton id={1} isBooked={true} />, { mocks, container });
        // fireEvent.click(getByTestId('action-button'));
        // await waitForElement(() => getByTestId('action-button'));
    });
});
