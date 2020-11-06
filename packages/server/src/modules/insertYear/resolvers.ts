// import * as yup from "yup";
// import { validUserSchema } from "@abb/common";

import { ResolverMap } from "../../types/graphql-utils";
// import { User } from "../../entity/User";
// import { formatYupError } from "../../utils/formatYupError";
// import {  duplicateEmail, } from "./errorMessages";
// // import { createConfirmEmailLink } from "./createConfirmEmailLink";
// import { sendEmail } from "../../utils/sendEmail";
import { EDboard } from "../../entity/EDboard";
import { YearGoal}  from "../../entity/YearGoal";
import { YearToMonthMN }  from "../../entity/YearToMonthMN";
// import { createQueryBuilder } from 'typeorm';
// import {  getConnection } from "typeorm"

import {InsertYearMutationArgs,  IErrorReponse} from "../../myTypes";


export const resolvers: ResolverMap = {
  Mutation: {
    insertYear: async ( 
      _,// parent,
      args :  InsertYearMutationArgs,
      __, // context,
      ___, // info

    ): Promise<IErrorReponse> => {
      const { edboardName, yeargoals  } = args;
      console.log("args: ", args)
      if(!yeargoals || !edboardName){  // null or undefined
        return {
          ok: false,
          message: "input value is null or undefined",
          path: "yeargoals edboardName"
        }
      }
      
      const edboard = await EDboard.findOne({name: edboardName});
      console.log("chk edboard: ", edboard);
      if(!edboard){
        return {
          ok: false,
          message: "EDBoard name is empty or duplicated",
          path: "edboard.id"
        }
      }else {
        // const yeargoalchk = await YearGoal.findOne({ year: yeargoals.year } as unknown as number);
        const yeargoalchk = await YearGoal.findOne({edboard: edboard.id, year: yeargoals.year} as any);
        console.log("chk yeargoalchk: ", yeargoalchk);
        if(yeargoalchk){  
          return {
            ok: false,
            message: yeargoalchk.year + " is already inputed",
            path: "YearGoalInput.year"
          }
        }
      }     
      
      // const yeargoalchk = await createQueryBuilder()
      // .select("b")
      // .addSelect("y")
      // .from(YearGoal,"y")
      // .innerJoin(EDboard,"b" ,"b.id = y.id")
      // .where("b.name = :pboardName", {pboardName: edboardName})
      // // .andWhere("y.year = :pyearName", { pyearName: yearName })
      // .getOne();
      // // .getMany();
      // console.log("chk yeargoalchk: ", yeargoalchk);
      // if(yeargoalchk){  
      //   return {
      //     ok: false,
      //     message: yeargoalchk.year + " is already inputed",
      //     path: "YearGoalInput.year"
      //   }
      // }
      

      // const yearGoalVal = yeargoals?.pop();
      const yearGoalVal = yeargoals;
      
      const yr = new YearGoal();
      yr.goal = yearGoalVal?.goal as number;
      yr.year = yearGoalVal?.year as number;
      yr.description = yearGoalVal?.description as string;
      yr.edboard = edboard  // as unknown as EDboard;
      await yr.save();

      // const ed = new EDboard();
      // ed.name = name as string;
      // ed.description = description as string;
      // // OneToMany 은 테이블에 칼럼은 생성 안 됨  
      // ed.yeargoals = [yr]   // 이걸해야 YearGoal edboardid 필드에 값이 생성됨

      // await ed.save();
      // console.log('ed: ', ed)
      // console.log('ed.yeargoals: ', ed.yeargoals)

      return {
        ok: true,
        message: 'succeed',
        path: 'insertYear Mutation'
      };
    },
  },
  
  
  Query: {
    yearGoalQuery: async () =>{
      const returnVal = await YearGoal.find({
        relations:['edboard','ymmns','ymmns.ygid']
      });
      console.log("chk : ", returnVal)
      return returnVal
    },
    
    yearGoalDeepQuery: async () => {

      const returnVal = await YearToMonthMN.find({        
        relations:['ygid','mgid',],    // ManyToOne 쪽에서 leftJoin 한다
        
        // relations:['monthgoals','ymmns','ymmns.yeargoal','edboard']
      })

      console.log("chk : ", returnVal)
      return returnVal;
    },
    
  }
  
};
