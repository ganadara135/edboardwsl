import { ResolverMap } from "../../types/graphql-utils";
import { YearGoal } from "../../entity/YearGoal";
import { EDboard } from "../../entity/EDboard";


export const resolvers: ResolverMap = {
  Query: {
    yearListByBoardNameQeury: async (_, { boardName })  => {

      // let returnVal;
      // let edBoardId = null;
     
      const edBoardId = await EDboard.findOne({
        where: { name: boardName}
      });
      
      console.log("테스트")
      console.log("edboardId : ", edBoardId)

      const returnVal = await YearGoal.find({
        where:{edboard: edBoardId}
      });

      console.log("chk : ", returnVal)
      const yearListVal = returnVal.map(val => val.year)
      return yearListVal;
    }
  }
};