import * as React from "react";
import {  Button } from 'antd';
import { withFormik, ErrorMessage,  FormikProps, Field, Form } from 'formik';
// import { validUserSchema } from "@abb/common";
import { FireOutlined } from "@ant-design/icons";
import { InputField } from "../../shared/InputField";
import { SelectField } from "../../shared/SelectField";
import { 
  NormalizedErrorMap, 
  InsertYearMutationVariables, 
  YearGoalInput,
  ListEDboardController } from "@abb/controller";
import * as Yup from "yup";

interface FormValues extends InsertYearMutationVariables{
  edboardName: string;
  yeargoals: YearGoalInput;
}
interface Props {
    onFinish: () => void;
    submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}
class C extends React.PureComponent<FormikProps<FormValues> & Props> {
    
  render() {
    const {  errors, touched} = this.props;
    const { message }: any = errors;

    return (
      <ListEDboardController >
        {(data) => {
          if (data.loading) {
            // return <div>...loading</div>;
            return <div style={{ margin: 20, display: "flex", justifyContent: "center" }}>...loading</div>
          }
          // console.log("data.listing board : ", data.listing)
          return (
          <Form style={{ display: "flex" }}> 
          <div style={{width: 400, margin:'auto'}}>
            <Field 
              as="select" 
              name="edboardName" 
              label="에너지명"
              listing={data.listing}
              component={SelectField}
            />
            <Field  
              name="yeargoals.year"
              label="목표연도"
              useNumberComponent={true}
              component={InputField}
              suffixIcon={
                <FireOutlined style={{ margin: 10}}/>
              }
              suffixLabel=" ex)  2020"
            />
            <ErrorMessage name="yeargoals.year" render={msg => <div style={{ color:'red'}}>{msg}</div>} />
            <Field  
              name="yeargoals.goal"
              label="목표값"
              useNumberComponent={true}
              component={InputField}
              suffixIcon={
                <FireOutlined style={{ margin: 10}}/>
              }
              suffixLabel=" 단위: 전력 W, 유체 Nm3"
            >
          
            </Field>
            <ErrorMessage name="yeargoals.goal" render={msg => <div style={{ color:'red'}}>{msg}</div>} />
            <Field  
              name="yeargoals.description"
              label="설____명"
              component={InputField}
            />
            {/* <ErrorMessage name="message" render={msg => <div style={{ color:'red'}}>{msg}</div>} /> */}
            {errors && touched ? ( <div style={{color:'red', margin:'auto'}}>{message}</div> ) : null}

            <div>
              <Button type="primary" htmlType="submit" className="">
                연간 목표값 등록
              </Button>
            </div>
          </div>
          </Form>
        )}}
      </ListEDboardController>
    );
  }
}

const InsertYearSchema = Yup.object().shape({
  edboardName: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('Required'),
  yeargoals: Yup.object<YearGoalInput>({
    year: Yup.number().min(1970, 'Too Short!').max(9999, 'Too Long!').required(),
    goal: Yup.number().min(1, 'Too Short!').max(99999999, 'Too Long!').required(),
  }),
});

export const InsertYearView = withFormik<Props, FormValues>({
    // validateOnChange : false,
    // validateOnBlur: false,
    validationSchema : InsertYearSchema,
    mapPropsToValues: () =>  ({ edboardName: "", yeargoals: {
      year: 0, goal: 0, description: ""}
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      console.log("handleSubmit: ", values)

      const errors = await props.submit(values);
      
      if(errors){
        console.log("error : ", errors)
        setErrors(errors)
      } else {
        props.onFinish();
      }
    }
})(C);