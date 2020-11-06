import * as React from "react";
import { ListYearController,  } from "@abb/controller";
// import { RouteComponentProps, Link } from "react-router-dom";
// import { Form, Field,   } from 'formik';
// import { Button,  } from 'antd';

// const { Meta } = Card;
// import { SelectField } from "../../shared/SelectField";
// import { HandleProps } from "../ViewListingconnector";
// import { InputField } from "../../shared/InputField";

// export interface FormValues {  // extends InsertMonthMutationVariables{
//   yearName: number;
//   boardName: string;
// }

// interface Props {
//   boardName: string;
//   // submit: (values: FormValues) => Promise<FormValues | null>;
//   // submit: (myFunc: HandleProps) => void;
//   submit: (values: FormValues) => void;
// }

import { Select } from 'antd';

//export class C extends React.PureComponent<FormikProps<FormValues> & Props & HandleProps > {
export class ViewListingYear extends React.PureComponent<{}> {
 
  render() {
    // const {
    // //  boardName
    // } = this.props;
    // const orgObject = { label: '', value: '' };
    return (
      <ListYearController yearName={1970} boardName={''}>
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
              // onChange={this.handleBoardsChange}
            >
              {data.listing?.map((year:any,index:number) => (
                <Select.Option key={index} value={year}>{year}</Select.Option>
              ))}
            </Select>
            </div>
          )
        }}
      </ListYearController>
    );
  }
}