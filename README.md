# Adidas Coding Challenges

The project structure is as below:

```console
└── adidas-shop
    ├── client $ yarn start | http://localhost:8000/ 
    ├── data-importer
    ├── intro
    ├── ml-service
    ├── server $ yarn start | http://localhost:4000/  
    ├── docker-compose-yml
    └── README.md
```

## Which Technologies are Used and Why?

I adopted TDD development approach  as the development process for the project. For example on the app's frontend side, each component has a unique test component.

e.g
```console
cd client && yarn test 
```
For the frontend technologies: I used the react and apollo-client (GraphQL). I didn't use redux to manage the application states. Why? 

Because;
    Using GraphQL instead of REST will get rid of a huge amount of complexity in your client-side state management and reduce the scope of your client side code to just how data should render in the UI.

For the backend side technologies: I used nodeJs,GraphQL, Mongodb, Sqllite etc.

E.g
```console
cd server && yarn test 
```

For host the api and the spa: I used nginx and docker,  

## How can I run? 

It's very simple:

```console
docker-compose up
```

Some dummy graphql queries:
```
query {
  search(filter: "Manchester") {
    hasMore
    cursor
    products {
      name
      id
      title
      cursor
    }
  }
}
```

```
query {
  products(after:"1549608748") {
    cursor
    products {
      name
    }
  }
}
```
