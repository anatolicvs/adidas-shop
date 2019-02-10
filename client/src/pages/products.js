import React, { Fragment } from 'react';
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { FormContainer, StyledInput } from '../components/login-form';
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
      cursor
      products {
         ...ProductTile
      }
    }
  }
  ${PRODUCT_TILE_DATA}
`;

export const SEARCH_PRODUCTS = gql`
   query Search($filter: String){
    search(filter:$filter) {
       hasMore
       cursor
       products {
         ...ProductTile
       }
    }
   }
  ${PRODUCT_TILE_DATA}
`;


class Products extends React.Component {

    state = {
        products: [],
        filter: '',
        isSearched: false,
    }

    render() {
        return (
            <Query query={GET_PRODUCTS}>
                {({ data, loading, error, fetchMore }) => {
                    if (loading) return <Loading />;
                    if (error) return <p>ERROR</p>;
                    return (
                        <Fragment>
                            <Header />
                            <FormContainer>
                                <StyledInput
                                    required
                                    type="text"
                                    name="search"
                                    placeholder="Type Product Name"
                                    onChange={this._onChange}
                                />
                                <Button type="submit" onClick={this._executeSearch}>Search</Button>
                            </FormContainer>
                            {this.state.isSearched && this.state.products &&
                                this.state.products.map(product => (
                                    <ProductTile key={product.id} product={product} />
                                ))
                            }
                            {!this.state.isSearched && data.products &&
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
                                                        products: {
                                                            ...fetchMoreResult.products,
                                                            products: [
                                                                ...prev.products.products,
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

    _onChange = event => {
        const filter = event.target.value;
        this.setState(s => ({ filter }));
    };
    _executeSearch = async () => {

        const { filter } = this.state
        if (filter) {
            const result = await this.props.client.query({
                query: SEARCH_PRODUCTS,
                variables: { filter },
            })
            const products = result.data.search.products;
            this.setState({ products, isSearched: true });
        } else {
            this.setState({
                isSearched: false
            });
        }
    }
}

export default withApollo(Products);
