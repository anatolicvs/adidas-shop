import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { PRODUCT_TILE_DATA } from './products';
import { Loading, Header, Productdetail } from '../components';
import { ActionButton } from '../containers';

export const GET_PRODUCT_DETAILS = gql`
  query ProductDetails($productId: ID!) {
    product(id: $productId) {
      isInCart @client
      ...ProductTile
    }
  }
  ${PRODUCT_TILE_DATA}
`;

export default function Product({ productId }) {
    return (
        <Query query={GET_PRODUCT_DETAILS} variables={{ productId }}>
            {({ data, loading, error }) => {
                if (loading) return <Loading />;
                if (error) return <p>ERROR: {error.message}</p>;

                return (
                    <Fragment>
                        <Header>
                            {data.product.name}
                        </Header>
                        <Productdetail {...data.product} />
                        <ActionButton {...data.product} />
                    </Fragment>
                );
            }}
        </Query>
    );
}
