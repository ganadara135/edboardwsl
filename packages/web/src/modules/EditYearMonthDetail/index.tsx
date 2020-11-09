import * as React from "react";
import { EditYearController, EditMonthController } from '@abb/controller';
import { RouteComponentProps } from "react-router-dom";
import { EditYearPage } from "./ui/EditYearPage";
import { EditMonthPage } from "./ui/EditMonthPage";

interface IPropsVal {
  y_id: string;
  y_year: number;
  y_goal: number;
  y_description: string;

  m_id: string;
  m_month: number;
  m_goal: number;
  m_description: string;
}

export class EditYearMonthDetail extends React.PureComponent<
    RouteComponentProps<{}>, IPropsVal  // 이게 state 임
> {
    onFinish = () => {
      console.log("chk onFinish() in EditYearMonthDetail")
      this.props.history.replace( { pathname: "/"});
    }

    render() {      
      console.log("match in Detail Page : ", this.props.match);
      console.log("state : ", this.props.location.state)
      const paramData = this.props.location.state;
      const {y_id,y_year,y_goal,y_description, m_id, m_month, m_goal, m_description} = paramData as IPropsVal;
      // const paramData = this.props.match.params;
      // const {y_id, y_goal, m_id, m_goal, } = paramData as IPropsVal;
      // const {y_id,y_year,y_goal,y_description, m_id, m_month, m_goal, m_description} = paramData as IPropsVal;
      // console.log(paramData);
      console.log(y_id,y_year,y_goal,y_description, m_id, m_month, m_goal, m_description);

      return (
        <>
        {
          this.props.match.params !== undefined ?
            <EditYearController>
              {({ submit }: any) => 
              <EditYearPage 
                submit={submit}
                onFinish={this.onFinish}
                y_id={y_id}
                year={Number(y_year)}
                goal={Number(y_goal)}
                description={y_description}
              >
                {y_id}
              </EditYearPage>}
            </EditYearController> : null
        }
        {
          this.props.match.params !== undefined ?
          <EditMonthController>
            {({ submit }: any) => 
            <EditMonthPage 
              submit={submit}
              onFinish={this.onFinish}
              m_id={m_id}
              month={Number(m_month)}
              goal={Number(m_goal)}
              description={m_description}
              y_id={y_id}
              year={Number(y_year)}
              
            >
              {m_id}
            </EditMonthPage>}
          </EditMonthController> : null
        }
        </>
      )
    }
}