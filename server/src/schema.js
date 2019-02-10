const { gql } = require('apollo-server');

const typeDefs = gql`

 type Query {
    products(
        """
        The number of results to show. Must be > 1. Default = 20
        """
        pageSize: Int
        """
        if you add a cursor here, it will only return results _after_ this cursor
        """
        after: String
    ):ProductList!
    product(id:ID!): Product
    me:User
    search(filter: String
           pageSize: Int
           after: String):ProductList!
 }

 type Mutation {
     # if false, signup failed --check errors
     addProductsToWishlist(productIds: [ID]!): WishlistUpdateResponse!
     # if false, removing processes failed --check errors
     removeProductFromWishlist(productId:ID!): WishlistUpdateResponse!
     login(email:String): String # login token
 }

 type WishlistUpdateResponse {
     success: Boolean!
     message: String
     products: [Product]
 }

 type ProductList {
     cursor: String!
     hasMore: Boolean!
     products: [Product]!
 }

type Product {
    id: ID!
    name:String
    title: String
    imageUri: String
    cursor: Int
    priceCurrency: String
    isBooked: Boolean!
}

type User {
    id:ID!
    email: String!
    wishlist: [Product]!
}`;

module.exports = typeDefs;
