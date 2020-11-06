import { ResolverMap } from "../../types/graphql-utils";

import { EDboard } from "../../entity/EDboard";
import {CreateEdBoardMutationArgs,  IErrorReponse} from "../../myTypes";

export const resolvers: ResolverMap = {
    Mutation: {
        createEDBoard: async ( 
          _,// parent,
          args :  CreateEdBoardMutationArgs,
          __, // context,
          ___, // info
    
        ): Promise<IErrorReponse> => {

            console.log('args : ', args);
            if(!args.name){  // null or undefined
                return {
                    ok: false,
                    message: "edboard.name is null or undefined",
                    path: "args.name"
                }
            }
            const edboard = await EDboard.findOne({name: args.name});
            console.log("chk edboard: ", edboard);
            if(edboard){  
                return {
                ok: false,
                message: "EDBoard name is empty or duplicated",
                path: "edboard.id"
                }
            }else {

                const ed = new EDboard();
                ed.name = args.name as string;
                ed.description = args.description as string;
                // OneToMany 은 테이블에 칼럼은 생성 안 됨  
                // ed.yeargoals = [yr]   // 이걸해야 YearGoal edboardid 필드에 값이 생성됨

                await ed.save();
                console.log('ed: ', ed)
                console.log('ed.yeargoals: ', ed.yeargoals)

                return {
                    ok: true,
                    message: "Succeed",
                    path: "createEDBoard Mutation"
                }
            }
        }
    },
    Query: {
        edboardQuery: async () => {
            const returnVal = await EDboard.find({
                relations:['yeargoals'], // defaults is left join
            })
            return returnVal;
        },
    }
}