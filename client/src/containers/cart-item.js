import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ProductTile from '../components/product-tile';
import { PRODUCT_TILE_DATA } from '../pages/products';

export const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    product(id: $productId) {
      ...ProductTile
    }
  }
  ${PRODUCT_TILE_DATA}
`;

export default function CartItem({ productId }) {
    return (
        <Query query={GET_PRODUCT} variables={{ productId }}>
            {({ data, loading, error }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>ERROR: {error.message}</p>;
                return data && <ProductTile product={data.product} />;
            }}
        </Query>
    );
}
