import { ResolverMap } from "../../types/graphql-utils";
import { YearGoal }  from "../../entity/YearGoal";
import { MonthGoal }  from "../../entity/MonthGoal";
import { YearToMonthMN }  from "../../entity/YearToMonthMN";
import { getRepository} from "typeorm";
import { EditYearMutationArgs, EditMonthMutationArgs, IErrorReponse} from "../../myTypes";


// select mn.*, y.*, m.*  from YearToMonthMNs as mn, MonthGoals as m, YearGoals as y WHERE y.id = mn.ygidId AND mn.mgidId = m.id;
export const resolvers: ResolverMap = {
  Mutation: {
    editYear: async (
      _,// parent,
      args: EditYearMutationArgs,  
      __, // context,
      ___, // info

    ): Promise<IErrorReponse> => {
      const { y_id, year, goal, description  } = args;
      console.log("args: ", args)
      if(!year || !goal || !y_id){  // null or undefined
        return {
          ok: false,
          message: "year or goal is null or undefined",
          path: "checking args"
        }
      }

      // Updating Database
      const checkYearGoal = await YearGoal.findOne(y_id);
      console.log("chk checkYearGoal: ", checkYearGoal);
      if(!checkYearGoal){
        return {
          ok: false,
          message: "Cannot find y_id, which is index number",
          path: "YearGoal.findOne()"
        }
      }

      // 이전과 같은해가 아닌 연도로 입력해야 중복 연도가 있는지 체크함
      if(checkYearGoal.year !== year){
        const checkAlreadyYear = await YearGoal.findOne({ year });
        console.log("check AlreadyYear: ", checkAlreadyYear);
        if(checkAlreadyYear){
          return {
            ok: false,
            message: "Your year inputted already exist",
            path: "YearGoal.findOne(year)"
          }
        }
      }

      checkYearGoal.year = year;
      checkYearGoal.goal = goal;
      description ? checkYearGoal.description = description : checkYearGoal.description = undefined;
      await YearGoal.save(checkYearGoal);

      return {
        ok: true,
        message: "Succeed",
        path: "YearGoal.save()"
      }
    },

    editMonth: async (
      _,// parent,
      args: EditMonthMutationArgs,  
      __, // context,
      ___, // info

    ): Promise<IErrorReponse> => {
      const { m_id, month, goal, description, y_id, year } = args;
      console.log("args: ", args)
      if( !goal || !m_id || !year){  // null or undefined
        return {
          ok: false,
          message: "goal, yearName is null or undefined",
          path: "checking args"
        }
      }

      // Updating Database
      const checkMonthGoal = await MonthGoal.findOne(m_id);
      console.log("chk checkMonthGoal: ", checkMonthGoal);
      if(!checkMonthGoal){
        return {
          ok: false,
          message: "Cannot find m_id, which is index number",
          path: "MonthGoal.findOne()"
        }
      }

      const mnVal = await getRepository(MonthGoal)
        .createQueryBuilder("monthgoals")
        .where((qb:any) => {
            const subQuery = qb.subQuery()
                .select("mn.mgid")
                .from(YearToMonthMN, "mn")
                .from(YearGoal, "y")
                .where("mn.ygid = :yeargoalId",{yeargoalId: y_id})
                .andWhere("y.year = :yearName", {yearName: year})
                .getQuery();
            return "monthgoals.id IN " + subQuery;
        })
        .andWhere("monthgoals.month = "+ month )
        .getMany();
      
      console.log('chk mnVal :', mnVal)
      if(mnVal.length !== 0 && month !== checkMonthGoal.month){  // 중복 발생
          return {
          ok: false,
          message: "month are dupulicated",
          path: "getRepository()"
          }
      }


      // checkMonthGoal.month = month;
      // tslint:disable-next-line: prefer-conditional-expression
      month !== null ? checkMonthGoal.month = month : checkMonthGoal.month = 13;
      checkMonthGoal.goal = goal;
      description ? checkMonthGoal.description = description : checkMonthGoal.description = undefined;
      await MonthGoal.save(checkMonthGoal);

      return {
        ok: true,
        message: "Succeed",
        path: "MonthGoal.save()"
      }
    }
  }
};