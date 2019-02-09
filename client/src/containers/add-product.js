import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Button from '../components/button';
import { GET_PRODUCT } from './cart-item';

export { GET_PRODUCT };
export const ADD_PRODUCTS_TO_WISHLIST = gql`
  mutation AddProductsToWishlist($productIds: [ID]!) {
    addProductsToWishlist(productIds: $productIds) {
      success
      message
      products {
        id
        name
        title
        imageUri
        isBooked
      }
    }
  }
`;

export default function AddProducts({ cartItems }) {
    return (
        <Mutation
            mutation={ADD_PRODUCTS_TO_WISHLIST}
            variables={{ productIds: cartItems }}
            refetchQueries={cartItems.map(productId => ({
                query: GET_PRODUCT,
                variables: { productId },
            }))}
            update={cache => {
                cache.writeData({ data: { cartItems: [] } });
            }}
        >
            {(addProductsToWishlist, { data, loading, error }) =>
                data && data.addProductsToWishlist && !data.addProductsToWishlist.success ? (
                    <p data-testid="message">{data.addProductsToWishlist.message}</p>
                ) : (
                        <Button onClick={addProductsToWishlist} data-testid="book-button">
                            Add All To Wishlist
                        </Button>
                    )
            }
        </Mutation>
    );
}
