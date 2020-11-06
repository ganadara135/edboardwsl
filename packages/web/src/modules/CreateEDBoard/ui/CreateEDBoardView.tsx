import * as React from "react";
import {    Button } from 'antd';
import { withFormik,     FormikProps, Field, Form } from 'formik';
// import { validUserSchema } from "@abb/common";
import { InputField } from "../../shared/InputField";
import { SelectField } from "../../shared/SelectField";
// import { Link } from "react-router-dom";
import { ListEDboardController } from "@abb/controller";
import { NormalizedErrorMap, CreateEDBoardMutationVariables } from "@abb/controller";

interface FormValues extends CreateEDBoardMutationVariables{
  name: string;
  description: string;
}
interface Props {
  onFinish: () => void;
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}
class C extends React.PureComponent<FormikProps<FormValues> & Props> {
    
  render() {
      // const { handleSubmit, errors} = this.props;
      const {  errors, touched} = this.props;
      const { message }: any = errors;

      return (
        <ListEDboardController >
          {(data) => {
            if (data.loading) {
              // return <div>...loading</div>;
              return <div style={{ margin: 20, display: "flex", justifyContent: "center" }}>...loading</div>
            }

            return (
              <div style={{ width: 400, margin:'auto'}}>
              <Field 
                as="select" 
                name="edboardName" 
                label="등록된 에너지명"
                listing={data.listing}
                component={SelectField}
              />
              <Form > 
              <div style={{width: 400, margin:'auto'}}>
                <Field  
                  name="name"
                  label="에너지명"
                  // prefix={
                  //   <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} /> as any
                  // }
                  component={InputField}
                />
                <Field  
                  name="description"
                  label="설_____명"
                  // prefix={
                  //   <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> as any
                  // }
                  component={InputField}
                />
                {errors && touched ? ( <div style={{color:'red', margin:'auto'}}>{message}</div> ) : null}
                <div>
                  <Button type="primary" htmlType="submit" className="">
                    테이블 생성
                  </Button>
                </div>
              </div>
              </Form>
              </div>
        )}}
        </ListEDboardController>
      );
  }
}


export const CreateEDBoardView = withFormik<Props, FormValues>({
    // validationSchema: validUserSchema,
    // validateOnChange : false,
    // validateOnBlur: false,
    mapPropsToValues: () =>  ({ name: "", description: "" }),
    handleSubmit: async (values, {props, setErrors}) => {
        console.log("handleSubmit: ", values)
        // values.yeargoals.goal
        
        const errors = await props.submit(values);
        if(errors){
            setErrors(errors)
        } else {
          props.onFinish();
        }
    }
})(C);