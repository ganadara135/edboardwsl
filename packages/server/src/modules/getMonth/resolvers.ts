import { ResolverMap } from "../../types/graphql-utils";
import { MonthGoal } from "../../entity/MonthGoal";
// import {IErrorReponse} from "../../myTypes";

export const resolvers: ResolverMap = {
  Query: {
    getMonthQuery: async (
      _, { m_id }
      ): Promise<MonthGoal> => {
            
      const returnVal = await MonthGoal.findByIds(m_id);
      console.log(returnVal)

      return returnVal.pop() as MonthGoal;   // null return if there are no data
    }
  }
};