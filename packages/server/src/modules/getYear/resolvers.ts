import { ResolverMap } from "../../types/graphql-utils";
import { YearGoal } from "../../entity/YearGoal";
// import {IErrorReponse} from "../../myTypes";

export const resolvers: ResolverMap = {
  Query: {
    getYearQuery: async (
      _, { y_id }
      ): Promise<YearGoal> => {

      
            
      const returnVal = await YearGoal.findByIds(y_id);
      console.log(returnVal)

      return returnVal.pop() as YearGoal;   // null return if there are no data

      // if (returnVal.length === 0 ){      
      //   return {
      //     ok: false,
      //     message: "No data",
      //     path: "getYearQuery by ID"
      //   }
      // }else {
      //   return returnVal as any
      // }
    }
  }
};