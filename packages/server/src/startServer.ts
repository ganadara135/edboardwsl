import "reflect-metadata";
import "dotenv/config";
// import { GraphQLServer } from "graphql-yoga";
import { ApolloServer } from "apollo-server-express";
import * as cors from 'cors';
import * as express from "express";
// const bodyParser = require('body-parser');
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as RateLimit from "express-rate-limit";
import * as RateLimitRedisStore from "rate-limit-redis";
// import { applyMiddleware } from "graphql-middleware";

import { redis } from "./redis";
import { createTypeormConn } from "./utils/createTypeormConn";
// import { confirmEmail } from "./routes/confirmEmail";
import { genSchema } from "./utils/genSchema";
import { redisSessionPrefix } from "./constants";
import { createTestConn } from "./testUtils/createTestConn";
// import { graphql } from "graphql";
// import { Middleware } from "./middleware";
// import { MiddlewareShield } from "./middlewareShield";


const SESSION_SECRET = "ajslkjalksjdfkl";
const RedisStore = connectRedis(session as any);

export const startServer = async () => {
  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
  }

  // const schema = genSchema() as any;
  // // applyMiddleware(schema, MiddlewareShield)
  // applyMiddleware(schema, Middleware);

  const app = express();
  // app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));

  const corsOptions = {
		origin: process.env.FRONTEND_HOST,
		credentials: true
	};

	app.use(cors(corsOptions));

  // var schema22 = genSchema() as any
  // console.log("schema22  :  ",  schema22)
  
  const server = new ApolloServer({
    schema: genSchema() as any,

    context: async ( {req} ) => ({
      redis,
      // 10.0.2.2   for android
      url: req.protocol + "://" + req.get("host"),
      session: req.session,
      req
    }),
    playground: true,
    introspection: true,  // for Production
    // playground: {
    //   endpoint: '/graphql'
    // }
    // typeDefs,
    // resolvers,

  });

  // console.log("-----------------------------")
  
  server.applyMiddleware({ 
    app,
    path: '/',
    cors: false, // disables the apollo-server-express cors to allow the cors middleware use
  });


  app.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis as any
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      delayMs: 0 // disable delaying - full speed until the max limit is reached
    })
  );

  
  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    } as any)
  );

//  app.get("/confirm/:id", confirmEmail);

  if (process.env.NODE_ENV === "test") {
    await createTestConn(true);
  } else {
    const conn = await createTypeormConn();
    const isConnected: boolean = conn.isConnected;
    console.log("연결 체크 : ", isConnected)
    // console.log("conn.showMigrations : ", conn.showMigrations)
    // console.log("conn : ", conn)
    await conn.runMigrations();
  }

  const port = process.env.SERVER_PORT || 4000;
  const app2 = await app.listen({ // .start({
    // cors,
    port: process.env.NODE_ENV === "test" ? 0 : port
  });
  console.log("FRONTEND_HOST: ", process.env.FRONTEND_HOST)
  console.log("Server is running on localhost:"+port);

  return app2;
};
