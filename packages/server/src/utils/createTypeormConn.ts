// import { getConnectionOptions, createConnection } from "typeorm";
import { createConnection } from "typeorm";

import { EDboard } from "../entity/EDboard";
import { YearGoal } from "../entity/YearGoal";
import { YearToMonthMN } from "../entity/YearToMonthMN";
import { MonthGoal } from "../entity/MonthGoal";

export const createTypeormConn = async () => {
  // console.log("MYSQL_USER : ", process.env.MYSQL_USER)
  // console.log("TYPEORM_HOST : ", process.env.TYPEORM_HOST)
  // console.log("TYPEORM_CONNECTION : ", process.env.TYPEORM_CONNECTION)
  // console.log("TYPEORM_USERNAME : ", process.env.TYPEORM_USERNAME)
  // console.log("TYPEORM_PASSWORD : ", process.env.TYPEORM_PASSWORD)
  // console.log("TYPEORM_DATABASE : ", process.env.TYPEORM_DATABASE)
  // ormconfig.json 에서 읽어옮
  // const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  // console.log("체크 connectionOption : ", connectionOptions)
  return process.env.NODE_ENV === "production"
   ? createConnection({
      // ...connectionOptions,
      // url: process.env.DATABASE_URL,
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,

      synchronize: true,      // 중요
      logging: true,
      charset: "utf8mb4_unicode_ci",
      entities: [  EDboard, YearGoal, YearToMonthMN, MonthGoal],
      name: "default"
    } as any)
    // Docker 안에서 Development 버전도 돌려야하므로 직접 적어줌, ormconfig.json  안 통함
    : createConnection({
      // ...connectionOptions}
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: true,      // 중요, 테이블 변경할 안정화되면, false 로 변경후 migration 으로 처리
      logging: true,
      // charset: "utf8mb4_unicode_ci",
      // charset: "utf8",    // 원하는 대로 안됨
      // extra : {
      //   charset: "utf8mb4_unicode_ci"
      // },
      // url: process.env.DATABASE_URL,
      entities: [  EDboard, YearGoal, YearToMonthMN, MonthGoal],
      name: "default"} as any);
}  