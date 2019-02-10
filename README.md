# Adidas Coding Challenges

First of all thank you for invating to your interview. I appreciated so much and I tried to do my best. The project structure is as below;

```console
└── adidas-shop
    ├── client http://localhost:8000/
    ├── data-importer
    ├── intro
    ├── ml-service
    ├── server http://localhost:4000/
    ├── docker-compose-yml
    └── README.md
```

## Which technologies are used and Why?

During the project development process, I adopted TDD development approach through the project. For example on the app's front side, each component has unique test component.

e.g
```console
cd client && yarn test 
```
For the frontend technologies: I used the react and apollo-client (GraphQL). I didn't use redux to managed the application states. Why? 

Because;
    If you can use GraphQL instead of REST, you should. Switching will get rid of a huge amount of complexity in your client-side state management and reduce the scope of your client side code to just how data should render in the UI (which is what it should have been all along).

For the backend side technologies: I used nodeJs,GraphQL, Mongodb, Sqllite ...

e.g
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


## What about watching quick Introduction of the project?

I prepared a quick demo, you can find under the `intro` folder. :) 

Also, while you test it locally in your machine, you should remove store.sqlite file from server folder.



Best Regards

Aytaç Özkan
