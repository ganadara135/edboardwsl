import * as React from "react";
// import { ViewListingController } from '@abb/controller';

import { ViewListingBoards } from "./ui/ViewListingBoards";
// import { FormValues, } from "./ui/ViewListingYear";
import {  RouteComponentProps, Link } from "react-router-dom";
// import { InsertYearConnector } from "../InsertYear/InsertYearConnector";
// import {InsertYearController} from '@abb/controller';
// import { Link } from "react-router-dom";
// import { InsertYearView } from "./ui/InsertYearView";

import { Menu } from 'antd';

// export interface HandleProps {
//   onHandleParam: (val: FormValues) => void;
// }
export interface ParamValues { 
  boardName: string;
}

export class InsertData extends React.PureComponent<
RouteComponentProps<{}>, { selectedBoard: string}
> {
    constructor(props: any){
      super(props);      
      this.state = {selectedBoard: ""};
    }

    onHandleParam = async ( boardVal: string) => {
      // console.log(" in handleParam(): ", yearVal , " / ", boardVal)
      this.setState({ selectedBoard: boardVal})
      return null;  // null is no error meaning
                    // chk ViewListingView.tsx if(errors){...}
    }

    onFinish = () => {
      this.props.history.push('/donemsg', {
          message: "등록이 완료 됐습니다."
      });
    }

    render() {     
      console.log("selectedBoard ==> ", this.state.selectedBoard) 
      return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}  >
          <div style={{ justifyContent: "center", flexDirection: "column", flexFlow: "row wrap"}}>
          <ViewListingBoards
            onHandleParam={this.onHandleParam}
          >
          </ViewListingBoards>
          </div>

          <div>
          { this.state.selectedBoard === "" ? [] : 
          <Menu mode="horizontal">
            <Menu.Item key="inputYear" >
              <Link to={`/insertyear/${this.state.selectedBoard}`}>
                연 데이터 입력 
              </Link>
            </Menu.Item>
            <Menu.Item key="inputMonth" >
              <Link to={`/insertmonth/${this.state.selectedBoard}`}>
                월 데이터 입력 
              </Link>
            </Menu.Item>
          </Menu> }
          </div> 

          {/* <div>
          { this.state.selectedBoard === "" ? [] : 
  
            <InsertYearController >
            {({ submit } : any) => <InsertYearView onFinish={this.onFinish} submit={submit} />} 
            </InsertYearController>
          }
          </div> */}
        </div>
        
      );
    }
}

// export default withRouter(ViewListingConnector);