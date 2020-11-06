import * as React from "react";
import { ViewListingController } from '@abb/controller';

import { ViewListingBoards } from "./ui/ViewListingBoards";
// import { FormValues, } from "./ui/ViewListingYear";
import { Link, RouteComponentProps } from "react-router-dom";
import { Card,  } from 'antd';

// export interface HandleProps {
//   onHandleParam: (val: FormValues) => void;
// }
export interface ParamValues { 
  yearName: number;
  boardName: string;
}

export class ViewListingConnector extends React.PureComponent<
RouteComponentProps<{}>, {selectedYear: number, selectedBoard: string}
> {
    constructor(props: any){
      super(props);      
      this.state = {selectedYear: 0, selectedBoard: ""};
    }

    onHandleParam = async (yearVal: number, boardVal: string) => {
      console.log(" in handleParam(): ", yearVal , " / ", boardVal)
      this.setState({selectedYear: yearVal,  selectedBoard: boardVal})
      // this.setState({selectedBoard: val.boardName})
      // this.state.selectedYear = val.yearName;
      return null;  // null is no error meaning
                    // chk ViewListingView.tsx if(errors){...}
    }

    render() {     
      console.log("selectedYear ==> ", this.state.selectedYear)
      console.log("selectedBoard ==> ", this.state.selectedBoard) 
      return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}  >
          <div style={{ justifyContent: "center", flexDirection: "column", flexFlow: "row wrap"}}>
          <ViewListingBoards
            // onFinish={this.onFinish} 
            // submit={this.handleYearName}
            onHandleParam={this.onHandleParam}
            // handleParam={this.handleParam((this.state.selectedYear, this.state.selectedBoard) as unknown as FormValues)}
          >
          </ViewListingBoards>
          </div>

          <div>
          {this.state.selectedYear === undefined || this.state.selectedBoard === undefined ? [] : 
            <ViewListingController  
              yearName={this.state.selectedYear}
              boardName={this.state.selectedBoard}>
            {(data: any) => {
              console.log("ViewListingController data : ", data);

              if (data.loading) {
                return <div style={{display: "flex", justifyContent: "center"}}>...loading</div>;
              }
              return (
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "flex-start", }}>
                  { data.listing?.ordered?.map((l:any) =>
                    <Card
                      key={`${l?.mn_id}-card`}
                      hoverable={true}
                      loading={data.loading}
                      style={{ width: 500 }}
                    >
                      <Link to={`/editpage/${l.m_id}/${l.m_month}/${l.m_goal}/${l.m_description}/${l.y_id}/${l.y_year}/${l.y_goal}/${l.y_description}`}>  
                        <Card.Meta title={l.y_year + '년  ' + (l.m_month+1) + '월'}  description={
                          "연간전력목표: " + l.y_goal
                          // l.m_myTimestamp
                        }>
                        </Card.Meta>
                      {/* <Typography.Text type="secondary"> 연간 전력목표: {l.y_goal}</Typography.Text> */}
                        
                        월전력목표: {l.m_goal} <br/>
                        해당월설명: {l.m_description} <br/>
                        연간 설명: {l.y_description} <br/>
                        mn  설명: {l.mn_description} <br/> 
                          {/* <Button type="primary"><Link to={`/listing/${l?.id}-mm`}>수정</Link></Button> */}                      
                      </Link>
                    </Card>
                  )
                }
                </div>
              );}}
    
            </ViewListingController>            
          }
          </div>
        </div>
        
      );
    }
}

// export default withRouter(ViewListingConnector);