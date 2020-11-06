import { ResolverMap } from "../../types/graphql-utils";
import { YearGoal } from "../../entity/YearGoal";
import { EDboard } from "../../entity/EDboard";


export const resolvers: ResolverMap = {
  Query: {
    listYearQuery: async (_, { yearName, boardName })  => {

      let returnVal;
      if(yearName === 1970){  // 전체 연도 목록 끌어오기
        returnVal = await YearGoal.find();
      }else{
        const edboardId = await EDboard.findOne({
          where: { name: boardName}
        });
        // console.log("edboardId : ", edboardId)

        returnVal = await YearGoal.find({
          where:{year: yearName, edboard: edboardId}
        });
      }

      console.log("chk : ", returnVal)
      const yearListVal = returnVal.map(val => val.year)
      return yearListVal;
    }
  }
};