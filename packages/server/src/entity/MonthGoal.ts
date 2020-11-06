import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,

  OneToMany,
  // ManyToMany,
  // JoinTable,
  // ManyToMany
  // JoinColumn,
  // Generated,
} from "typeorm";

import { YearToMonthMN } from "./YearToMonthMN";
import { __Type } from "graphql";
// import { YearGoal } from "./YearGoal";


@Entity("MonthGoals")
export class MonthGoal extends BaseEntity {
  @PrimaryGeneratedColumn() 
  public id!: number;

  @Column({type:'int'})
  month!: number;

  // timestamp type is a kind of integer type
  @Column({type:'timestamp', nullable: false})
  myTimestamp: string;

  @Column("float",)
  goal?: number;

  @Column("varchar", { length: 255, nullable: true })
  description?: string;

  // OneToMany 는 테이블에 칼럼은 생성 안 됨  
  @OneToMany(_type => YearToMonthMN, ymnn => ymnn.mgid)
  ymmns: YearToMonthMN[];

  // @ManyToMany(_type => YearGoal, yeargoal => yeargoal.monthgoals)
  // // @JoinTable()
  // yeargoals: YearGoal[];

  //  @JoinColumn decorator, which indicates that this side of the relationship will own the relationship. 
  // Relations can be unidirectional or bidirectional
}
