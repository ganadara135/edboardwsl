import { ResolverMap } from "../../types/graphql-utils";
import { YearToMonthMN } from "../../entity/YearToMonthMN";
import { YearGoal } from "../../entity/YearGoal";
import { MonthGoal } from "../../entity/MonthGoal";

import { ListingOrdered  } from "../../myTypes";
import {  getConnection } from "typeorm"
import { EDboard } from "../../entity/EDboard";


// select mn.*, y.*, m.*  from YearToMonthMNs as mn, MonthGoals as m, YearGoals as y WHERE y.id = mn.ygidId AND mn.mgidId = m.id;
export const resolvers: ResolverMap = {
  Query: {
    viewListing: async (_, { yearName, boardName }
      // ) => {
      ): Promise<ListingOrdered> => {

        const ordered = await getConnection().createQueryBuilder()
        .select("mn")
        .addSelect("b")
        .addSelect("y")
        .addSelect("m")
        .from(YearToMonthMN,"mn")
        .innerJoin(YearGoal,"y" ,"mn.ygid = y.id")
        .innerJoin(MonthGoal,"m" ,"mn.mgid = m.id")
        .innerJoin(EDboard,"b","b.id = y.id")
        .where("b.name = :pboardName", {pboardName: boardName})
        .andWhere("y.year = :pyearName", { pyearName: yearName })
        .getRawMany()

      // const ordered = await YearToMonthMN.find({
      //   // relations:['ygid','mgid','ygid.ymmns','mgid.ymmns','ygid.ymmns.mgid'],      // 중요, OneToMany 시점 부터 안됨  'ygid.ymmns.mgid'
      //   relations:['ygid','mgid','ygid.ymmns','mgid.ymmns'],
      //   where: { year: yearName } 
      // });

      console.log("ordered: ", ordered)
      // return mnInfo;
      return {ordered : ordered as ListingOrdered[]}    // Very Important!!! It is different of TypeORM Entity and Graphql Type
      
    }
  }
};

/*

"SELECT `mn`.`id` AS `mn_id`, `mn`.`description` AS `mn_description`,
 `mn`.`ygidId` AS `mn_ygidId`, `mn`.`mgidId` AS `mn_mgidId`, `b`.`id` AS `b_id`,
  `b`.`name` AS `b_name`, `b`.`description` AS `b_description`, 
  `y`.`id` AS `y_id`, `y`.`year` AS `y_year`, `y`.`goal` AS `y_goal`, 
  `y`.`description` AS `y_description`, `y`.`edboardId` AS `y_edboardId`, `m`.`id` AS `m_id`, 
  `m`.`month` AS `m_month`, `m`.`myTimestamp` AS `m_myTimestamp`, `m`.`goal` AS `m_goal`, 
  `m`.`description` AS `m_description` FROM `YearToMonthMNs` `mn` 
  INNER JOIN `edboards` `b` ON `b`.`id` = `y`.`id`  
  INNER JOIN `YearGoals` `y` ON `mn`.`ygidId` = `y`.`id`  
  INNER JOIN `MonthGoals` `m` ON `mn`.`mgidId` = `m`.`id` 
  WHERE `b`.`name` = '가스' AND `y`.`year` = 2020"
  */