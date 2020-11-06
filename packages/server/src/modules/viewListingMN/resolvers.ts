// import * as yup from "yup";
// import { validUserSchema } from "@abb/common";

import { ResolverMap } from "../../types/graphql-utils";
// import { sendEmail } from "../../utils/sendEmail";
// import { EDboard } from "../../entity/EDboard";
// import { YearGoal }  from "../../entity/YearGoal";
import { YearToMonthMN } from "../../entity/YearToMonthMN";
// import { createQueryBuilder } from 'typeorm';
import { ListingMN  } from "../../myTypes";


// select mn.*, y.*, m.*  from YearToMonthMNs as mn, MonthGoals as m, YearGoals as y WHERE y.id = mn.ygidId AND mn.mgidId = m.id;
export const resolvers: ResolverMap = {
  Query: {
    viewListingMN: async (_, // { yearName }
      // ) => {
      ): Promise<ListingMN> => {
      const mnInfo = await YearToMonthMN.find({
        // relations:['ygid','mgid','ygid.ymmns','mgid.ymmns','ygid.ymmns.mgid'],      // 중요, OneToMany 시점 부터 안됨  'ygid.ymmns.mgid'
        relations:['ygid','mgid','ygid.ymmns','mgid.ymmns'],
        // where: { yearName } 
      });

      console.log("mnInfo: ", mnInfo)
      // return mnInfo;
      return {
        mnInfo: mnInfo as any,    // Very Important!!! It is different of TypeORM Entity and Graphql Type
        monthInfo: null,
        yearInfo: null
      } 
    }
  }
};
/*
SELECT `YearToMonthMN`.`id` AS `YearToMonthMN_id`,
 `YearToMonthMN`.`description` AS `YearToMonthMN_description`,
 `YearToMonthMN`.`ygidId` AS `YearToMonthMN_ygidId`,
 `YearToMonthMN`.`mgidId` AS `YearToMonthMN_mgidId`, 
 `YearToMonthMN__ygid`.`id` AS `YearToMonthMN__ygid_id`,
 `YearToMonthMN__ygid`.`year` AS `YearToMonthMN__ygid_year`, 
 `YearToMonthMN__ygid`.`goal` AS `YearToMonthMN__ygid_goal`, `YearToMonthMN__ygid`.`description` AS `YearToMonthMN__ygid_description`, 
 `YearToMonthMN__ygid`.`edboardId` AS `YearToMonthMN__ygid_edboardId`, `YearToMonthMN__ygid__ymmns`.`id` AS `YearToMonthMN__ygid__ymmns_id`, 
 `YearToMonthMN__ygid__ymmns`.`description` AS `YearToMonthMN__ygid__ymmns_description`, 
 `YearToMonthMN__ygid__ymmns`.`ygidId` AS `YearToMonthMN__ygid__ymmns_ygidId`, 
 `YearToMonthMN__ygid__ymmns`.`mgidId` AS `YearToMonthMN__ygid__ymmns_mgidId`, `YearToMonthMN__mgid`.`id` AS `YearToMonthMN__mgid_id`, 
 `YearToMonthMN__mgid`.`month` AS `YearToMonthMN__mgid_month`, `YearToMonthMN__mgid`.`goal` AS `YearToMonthMN__mgid_goal`, 
 `YearToMonthMN__mgid`.`description` AS `YearToMonthMN__mgid_description`, 
 `YearToMonthMN__mgid__ymmns`.`id` AS `YearToMonthMN__mgid__ymmns_id`, 
 `YearToMonthMN__mgid__ymmns`.`description` AS `YearToMonthMN__mgid__ymmns_description`, 
 `YearToMonthMN__mgid__ymmns`.`ygidId` AS `YearToMonthMN__mgid__ymmns_ygidId`, 
 `YearToMonthMN__mgid__ymmns`.`mgidId` AS `YearToMonthMN__mgid__ymmns_mgidId` 
 FROM `YearToMonthMNs` `YearToMonthMN` 
 LEFT JOIN `YearGoals` `YearToMonthMN__ygid` ON `YearToMonthMN__ygid`.`id`=`YearToMonthMN`.`ygidId`  
 LEFT JOIN `YearToMonthMNs` `YearToMonthMN__ygid__ymmns` ON `YearToMonthMN__ygid__ymmns`.`ygidId`=`YearToMonthMN__ygid`.`id`  
 LEFT JOIN `MonthGoals` `YearToMonthMN__mgid` ON `YearToMonthMN__mgid`.`id`=`YearToMonthMN`.`mgidId`  
 LEFT JOIN `YearToMonthMNs` `YearToMonthMN__mgid__ymmns` ON `YearToMonthMN__mgid__ymmns`.`mgidId`=`YearToMonthMN__mgid`.`id`
 */