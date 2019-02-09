import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import user1 from '../assets/images/aytac_ozkan.jpg';

import { Loading, Header, ProductTile } from '../components';
import { PRODUCT_TILE_DATA } from './products';

export const GET_MY_WISHLIST = gql`
  query GetMyWishlist {
    me {
      id
      email
      wishlist {
        ...ProductTile
      }
    }
  }
  ${PRODUCT_TILE_DATA}
`;

export default function Profile() {
    return (
        <Query query={GET_MY_WISHLIST} fetchPolicy="network-only">
            {({ data, loading, error }) => {
                if (loading) return <Loading />;
                if (error) return <p>ERROR: {error.message}</p>;
                return (
                    <Fragment>
                        <Header image={user1}>My Wishlist</Header>
                        {data.me && data.me.wishlist.length ? (
                            data.me.wishlist.map(product => (

                                <ProductTile key={product.id} product={product} />
                            ))
                        ) : (
                                <p>You haven't added any product</p>
                            )}
                    </Fragment>
                );
            }}
        </Query>
    );
}
