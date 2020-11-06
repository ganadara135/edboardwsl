import * as React from "react";
import { ListEDboardController, ListYearController } from "@abb/controller";
// import { RouteComponentProps, Link } from "react-router-dom";
// import {  FormikProps,  } from 'formik';
import {   Select } from 'antd';
// import { ViewListingYear, FormValues } from "./ViewListingYear";
// import { HandleProps } from "../ViewListingconnector";
const { Option } = Select;

const templeteObject = { label: '', value: '' };

export class ViewListingBoards extends React.PureComponent<{onHandleParam: any}>{ 
  state = {
    boardSelect: "",
    yearSelect: 0
  };

  handleBoardsChange = (value: string) => {
    this.setState({
      boardSelect: value
    });
  };

  handleYearChange = (value: number) =>  {
    console.log(`selected ${value}`);
    this.setState({
      yearSelect: value
    });
  }

  clickMe = () => {
    console.log(`clickMe ${this.state.yearSelect}`);
    this.props.onHandleParam(this.state.yearSelect,this.state.boardSelect)
  }

  render() {
    // const {
    //   onHandleParam
    // } = this.props;
    return (
      <ListEDboardController >
        {(data) => {
          if (data.loading) {
            // return <div>...loading</div>;
            return <div style={{ margin: 20, display: "flex", justifyContent: "center" }}>...loading</div>
          }

          console.log("data.listing : ", data.listing)
          console.log(data.listing?.map(x => Object.create(templeteObject, {label: {value: x}, value: {value: x}} )))
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
            <div>
              <ListYearController 
                yearName={1970} 
                boardName={this.state.boardSelect}>

                {(data: any) => {
                  if (data.loading) {
                    return <div style={{ display: "flex", justifyContent: "center" }}>...loading</div>;
                  }
                  console.log("data.listing : ", data.listing)
                  // console.log(data.listing?.map((x: any) => Object.create(orgObject, {label: {value: x}, value: {value: x}} )))
                  return (
                    <div style={{display: "flex", flexDirection: "row"}}>           
                    <Select              
                      style={{ width: 120 }}
                      onChange={this.handleYearChange}
                    >
                      {data.listing?.map((year:number,index:number) => (
                        <Select.Option key={index} value={year} >{year}</Select.Option>
                      ))}
                    </Select>
                    </div>
                  )
                }}
                </ListYearController>
                </div>
              }

              {this.state.yearSelect === 0 ? [] : 
                <button onClick={() => this.clickMe()}>
                 선택
                </button>}               
              
            </div>
        )}}

      </ListEDboardController>
    );
  }
}