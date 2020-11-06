import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  // JoinTable,
  // ManyToMany
  // JoinColumn,
  // Generated,
} from "typeorm";
import { YearGoal } from "./YearGoal";
import { MonthGoal } from "./MonthGoal";


@Entity("YearToMonthMNs")   // db 테이블명
export class YearToMonthMN extends BaseEntity {
  @PrimaryGeneratedColumn() 
  public id!: number;

  // @Column()
  // yearid!: number;

  // @Column()
  // monthid!: number;

  @Column("char", { length: 100, nullable: true })
  description: string;

  @ManyToOne(_type => YearGoal, yeargoal => yeargoal.ymmns,
    { cascade: true })
  ygid!: YearGoal;

  @ManyToOne(_type => MonthGoal, monthgoal => monthgoal.ymmns,
    { cascade: true })
  mgid!: MonthGoal;

}
