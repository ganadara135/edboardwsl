import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
// import dotenv from 'dotenv';
// import path from 'path';

//  create-react-app  에선 환경변수로   REACT_APP_  으로 시작하는 값만 처리해줌

console.log("process.env.REACT_APP_SERVER_URL: ",process.env.REACT_APP_SERVER_URL)
console.log("process.env.SERVER_PORT: ",process.env.REACT_APP_SERVER_PORT)
console.log("HttpLink: ", `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`)                        

export const client = new ApolloClient(
    {
        link: new HttpLink({
            uri: `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`,  // "http://localhost:4000",
            credentials: "include", 
        }),
        cache: new InMemoryCache(),
        connectToDevTools: true
    }
)
