import { ResolverMap } from "../../types/graphql-utils";
import { EDboard } from "../../entity/EDboard";
import { MonthGoal } from "../../entity/MonthGoal";
import { YearGoal }  from "../../entity/YearGoal";
import { YearToMonthMN } from "../../entity/YearToMonthMN";

import { InsertMonthMutationArgs, IErrorReponse} from "../../myTypes";

import { getRepository} from "typeorm";

export const resolvers: ResolverMap = {
    Mutation: {
        insertMonth: async (
            _, // parent,
            args : InsertMonthMutationArgs,
            __, // context,
            ___, // info
        ): Promise<IErrorReponse> => {
            
            console.log("args : ", args)
            const boardChk = await EDboard.findOne(
                {name: args.edboardName}
            )
            console.log('chk boardChk :', boardChk)
            if(!boardChk){
                return {
                    ok: false,
                    message: "boardName is null or undefined",
                    path: "args.edboardName"
                }
            }

            const yearVal = await YearGoal.findOne(
                {year: args.yearName, edboard: boardChk.id} as any
              // {relations:['yeargoals'],} // defaults is left join
            )
            console.log('chk yearVal :', yearVal)
            if(!yearVal){  // null or undefined
                return {
                  ok: false,
                  message: "yearName is null or undefined",
                  path: "args.yearName"
                }
            }

            const mnVal = await getRepository(MonthGoal)
            .createQueryBuilder("monthgoals")
            .where((qb:any) => {
                const subQuery = qb.subQuery()
                    .select("mn.mgid")
                    .from(YearToMonthMN, "mn")
                    .where("mn.ygid = :yeargoalId",{yeargoalId: yearVal.id})
                    .getQuery();
                return "monthgoals.id IN " + subQuery;
            })
            .andWhere("monthgoals.month = "+ args.month )
            .getMany();

            // const mnVal = await YearToMonthMN.find({
            //     relations:['ygid','mgid','ygid.ymmns','mgid.ymmns'], // 중요, OneToMany 시점 부터 안됨  'ygid.ymmns.mgid'
            //     // where: { ygid: yearVal.id, mgid.month: args.month } 
            //     where: [
            //         { ygid: yearVal.id },
            //         // { month: args.month }
            //     ]
            // });

            console.log('chk mnVal :', mnVal)
            if(mnVal.length !== 0){  // 중복 발생
                return {
                ok: false,
                message: "month or year are dupulicated",
                path: "YearToMonthMN"
                }
            }

            const ymMN = new YearToMonthMN();
            // ymMN.yearid = yearVal?.id as number;
            // ymMN.yeargoal = yearVal?.id as number;
            

            const monthGoal = new MonthGoal();
            monthGoal.goal = args?.goal as number;
            monthGoal.month = args?.month as number;
            monthGoal.description = args?.description as string;
            // monthGoal.myTimestamp = new Date(args?.yearName as number, args?.month) // .valueOf() / 1000;  //  timestamp 는 10자리, Date 형은 13자리

            console.log("chk myTimestamp :  ", args?.yearName+'-'+(args?.month + 1))
            monthGoal.myTimestamp = args?.yearName+'-'+(args?.month + 1);
            console.log("monthGoal.myTimestamp : ", monthGoal.myTimestamp);
            monthGoal.ymmns = [ymMN];
            // await monthGoal.save();         // removed as Cascade : true
  
            ymMN.ygid = yearVal as YearGoal;
            ymMN.mgid = monthGoal as MonthGoal;
            // ymMN.description = monthGoal?.description as string;
            await ymMN.save();

            console.log("ymMN: ", ymMN);
            console.log("monthGoal: ", monthGoal);

            return {
              ok: true,
              message: 'succeed',
              path: 'insertMonth Mutation'
            };
        }        
    },
    Query: {
        monthGoalQuery: async () => {
            const returnVal = await MonthGoal.find({
                relations:['ymmns','ymmns.yeargoal','ymmns.monthgoal'],                
                // relations:['ymmns','ymmns.yeargoal','ymmns.monthgoal','ymmns.yeargoal.ymmns','ymmns.monthgoal.ymmns']
            });
            return returnVal;
        }
    }

};
