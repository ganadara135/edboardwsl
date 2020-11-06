interface Error {
    ok: boolean;
    message: string;
    path: string;
};

export const normalizeErrors = (errors: Error) => {
    // const errMap: { [key: string]: string } = {};

    const errMap = {'message' : errors.message};

    // Object.keys(errors).forEach( (val, i, arr) => {
    //     errMap[i] = val;
    // });
    // errors.forEach(err => {
    //     errMap[err.path] = err.message;
    // });

    console.log("errMap : ", errMap)
    return errMap;

}