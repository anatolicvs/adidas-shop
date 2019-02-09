import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_PRODUCT_DETAILS } from '../pages/product';
import Button from '../components/button';

// export all queries used in this file for testing
export { GET_PRODUCT_DETAILS };

export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($productId: ID!) {
    addOrRemoveFromCart(id: $productId) @client
  }
`;

export const REMOVE_PRODUCT_FROM_WISHLIT = gql`
  mutation cancel($productId: ID!) {
    removeProductFromWishlist(productId: $productId) {
      success
      message
      products {
        id
        isBooked
      }
    }
  }
`;

export default function ActionButton({ isBooked, id, isInCart }) {
    return (
        <Mutation
            mutation={isBooked ? REMOVE_PRODUCT_FROM_WISHLIT : TOGGLE_CART}
            variables={{ productId: id }}
            refetchQueries={[
                {
                    query: GET_PRODUCT_DETAILS,
                    variables: { productId: id },
                },
            ]}
        >
            {(mutate, { loading, error }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>An error occurred</p>;

                return (
                    <div>
                        <Button
                            onClick={mutate}
                            isBooked={isBooked}
                            data-testid={'action-button'}
                        >
                            {isBooked
                                ? 'Remove from Wishlist'
                                : isInCart
                                    ? 'Remove from Cart'
                                    : 'Add to Cart'}
                        </Button>
                    </div>
                );
            }}
        </Mutation>
    );
}
