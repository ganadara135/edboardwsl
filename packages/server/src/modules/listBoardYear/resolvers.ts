import { ResolverMap } from "../../types/graphql-utils";
import { YearGoal } from "../../entity/YearGoal";
import { EDboard } from "../../entity/EDboard";

//  현재 사용  안 함
export const resolvers: ResolverMap = {
  Query: {
    listYearQuery: async (_, { yearName, boardName })  => {

      let returnVal;
      let edBoardId = null;
      if(yearName === 1970){  // 전체 연도 목록 끌어오기
        returnVal = await YearGoal.find();
      }else{
        edBoardId = await EDboard.findOne({
          where: { name: boardName}
        });
        
        console.log("테스트")
        console.log("edboardId : ", edBoardId)

        returnVal = await YearGoal.find({
          where:{year: yearName, edboard: edBoardId}
        });
      }

      


      console.log("chk : ", returnVal)
      const yearListVal = returnVal.map(val => val.year)
      return yearListVal;
    }
  }
};