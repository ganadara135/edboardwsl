const isAuthenticated =  async (
    resolve: any, 
    parent: any, 
    args: any, 
    context: any, 
    info: any
) => {
    console.log("check 이게 출력 되는지 확인11111")
    if (!context.session.userId) {
        console.log("check 이게 출력 되는지 확인")
        throw new Error("not authenticated from graphql middleware");
    }

    return resolve(parent, args, context, info);
};

// Minimal example middleware (before & after)
export const Middleware = {
    Mutation: {
      createListing: isAuthenticated,
      deleteListing: isAuthenticated
    }
};
   