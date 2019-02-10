import gql from 'graphql-tag';
import { GET_CART_ITEMS } from './pages/cart';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [Product]!
  }

  extend type Product {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Product]
  }
`;

export const resolvers = {
    Product: {
        isInCart: (product, _, { cache }) => {
            const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
            return cartItems.includes(product.id);
        },
    },
    Mutation: {
        addOrRemoveFromCart: (_, { id }, { cache }) => {
            const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
            const data = {
                cartItems: cartItems.includes(id)
                    ? cartItems.filter(i => i !== id)
                    : [...cartItems, id],
            };
            cache.writeQuery({ query: GET_CART_ITEMS, data });
            return data.cartItems;
        },
    },
};
