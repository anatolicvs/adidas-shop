import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { ProductTile, Header, Button, Loading } from '../components';

export const PRODUCT_TILE_DATA = gql`
  fragment ProductTile on Product {
    __typename
    id
    name
    title
    imageUri
    isBooked
  }
`;

export const GET_PRODUCTS = gql`
  query GetProductList($after: String) {
    products(after: $after) {
      hasMore
      products {
         ...ProductTile
      }
    }
  }
  ${PRODUCT_TILE_DATA}
`;

export default function Products() {
    return (
        <Query query={GET_PRODUCTS}>
            {({ data, loading, error, fetchMore }) => {
                if (loading) return <Loading />;
                if (error) return <p>ERROR</p>;
                return (
                    <Fragment>
                        <Header />
                        {data.products &&
                            data.products.products &&
                            data.products.products.map(product => (
                                <ProductTile key={product.id} product={product} />
                            ))}
                        {data.products &&
                            data.products.hasMore && (
                                <Button
                                    onClick={() =>
                                        fetchMore({
                                            variables: {
                                                after: data.products.cursor,
                                            },
                                            updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                                                if (!fetchMoreResult) return prev;
                                                return {
                                                    ...fetchMoreResult,
                                                    launches: {
                                                        ...fetchMoreResult.products,
                                                        launches: [
                                                            ...prev.launches.products,
                                                            ...fetchMoreResult.products.products,
                                                        ],
                                                    },
                                                };
                                            },
                                        })
                                    }
                                >
                                    Load More
                    </Button>
                            )}
                    </Fragment>
                );
            }}
        </Query>
    );
}
