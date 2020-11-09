import * as React from "react";
import { ListEDboardController, WithListEDboard } from "@abb/controller";
import {   Select } from 'antd';

const { Option } = Select;

// const templeteObject = { label: '', value: '' };

export class ViewListingBoards extends React.PureComponent<{onHandleParam: any}>{ 
  state = {
    boardSelect: ""
  };

  handleBoardsChange = (value: string) => {
    this.setState({
      boardSelect: value
    });
  };

  clickMe = () => {
    this.props.onHandleParam(this.state.boardSelect)
  }

  render() {

    return (
      <ListEDboardController >
        {(data: WithListEDboard) => {
          
          if (data.loading) {
            return <div style={{ margin: 20, display: "flex", justifyContent: "center" }}>...loading</div>
          }          

          // console.log("data.listing : ", data.listing)
          // console.log(data.listing?.map((x : any) => Object.create(templeteObject, {label: {value: x}, value: {value: x}} )))
          return (
                          
            <div style={{display: "flex", flexDirection: "row"}}>
            <label htmlFor="energyName">에너지종류선택</label><br/>
            <Select
              id="energyName"
              style={{ width: 120 }}
              onChange={this.handleBoardsChange}
            >
              {data.listing?.map((board:any,index:number) => (
                <Option key={index} value={board}>{board}</Option>
              ))}
            </Select>

              {this.state.boardSelect === "" ? [] : 
                <button onClick={() => this.clickMe()}>
                 선택
                </button>} 


            </div>
          )
      }}

      </ListEDboardController>
    );
  }
}