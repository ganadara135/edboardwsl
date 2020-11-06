import { rule, shield,   } from 'graphql-shield'

const isAuthenticated =  rule()((_: any, __: any, context: any) => {

    console.log("aaaaaaaaaa")
    console.log("context.session.userId : ", context.session.userId)
    console.log("!context.session.userId : ", !context.session.userId)
    console.log("!!context.session.userId : ", !!context.session.userId)
    // const chkval = undefined;
    // console.log("chkval : ", chkval)
    // console.log("!chkval : ", !chkval)
    // console.log("!!chkval : ", !!chkval)
    return !!context.session.userId;
});

// Minimal example middleware (before & after)
export const MiddlewareShield = shield({
    Mutation: {
      createListing: isAuthenticated,
      deleteListing: isAuthenticated
    }
});
   