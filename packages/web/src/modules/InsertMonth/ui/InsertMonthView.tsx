import * as React from "react";
import {  Button } from 'antd';
import { FireOutlined } from "@ant-design/icons";
import { withFormik,   FormikProps, Field, Form } from 'formik';
// import { validUserSchema } from "@abb/common";
import { InputMonthField } from "../../shared/InputMonthField";
import { InputField } from "../../shared/InputField";
import { SelectField } from "../../shared/SelectField";
import { LabelField } from "../../shared/LabelField";
// import { NormalizedErrorMap, ListBoardYearController } from '@abb/controller';
import { NormalizedErrorMap, YearListByBoardNameController } from '@abb/controller';
import * as Yup from "yup";


interface FormValues {  // extends InsertMonthMutationVariables{
  edboardName: string;
  month: number;
  goal: number;
  yearName: number;
  description?: string;
}
interface Props {
  boardName: string;
  onFinish: () => void;
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}
class C extends React.PureComponent<FormikProps<FormValues> & Props> {
    
  render() {
    const {  errors, touched, boardName} = this.props;

    const { message }: any = errors;
    console.log("boardName : ", boardName)
    console.log(" errors props : ", errors)
    console.log("this.props: ", this.props);

    return (              //  1970  means to request all years
      <YearListByBoardNameController boardName={boardName}>
        {(data: { loading: any; listingYear: any; }) => {
          if (data.loading) {
            // return <div>...loading</div>;
            return <div style={{ margin: 20, display: "flex", justifyContent: "center" }}>...loading</div>
          }
          // console.log("data.listingBoard : ", data.listingBoard)
          console.log("data.listingYear : ", data.listingYear)
          return (
            <Form style={{ display: "flex" }}> 
              <div style={{width: 400, margin:'auto'}}>
                <Field  
                  name="month"
                  label="월______"
                  pickerVal="month"
                  yearName={2020}
                  component={InputMonthField}
                />
                <Field  
                  name="goal"
                  label="목표값"
                  useNumberComponent={true}
                  component={InputField}
                  suffixIcon={
                    <FireOutlined style={{ margin: 10}}/>
                  }
                  suffixLabel=" 단위: 전력 W, 유체 Nm3"
                />
                <Field 
                  as="select" 
                  name="yearName" 
                  label="해당년도" 
                  placeholder="연도선택"
                  defaultValue={2020}
                  listing={data.listingYear}
                  component={SelectField}
                />
                <Field 
                  name="edboardName"
                  label="에너지명"
                  component={LabelField}
                  edValue={boardName}
                />
                {/* <Field 
                  as="select" 
                  name="boardName" 
                  label="에너지선택" 
                  placeholder="에너지"
                  // listing={data.listingBoard}
                  component={SelectField}
                /> */}
                {/* <ErrorMessage name="yeargoals.goal" render={msg => <div style={{ color:'red'}}>{msg}</div>} /> */}
                <Field  
                  name="description"
                  label="설____명"
                  component={InputField}
                />
                {/* <ErrorMessage name="message" render={msg => <div style={{ color:'red'}}>{msg}</div>} /> */}
                {errors && touched ? ( <div style={{color:'red', margin:'auto'}}>{message}</div> ) : null}

                <div>
                  <Button type="primary" htmlType="submit" className="">
                    월 목표값 등록
                  </Button>
                </div>
              </div>
            </Form>)
        }}
      </YearListByBoardNameController>
    );
  }
}

const InsertMonthSchema = Yup.object().shape({
  
  month: Yup.number().min(0, 'Too Short!').max(12, 'Too Long!').required('Required'),
  goal: Yup.number().min(1, 'Too Short!').max(99999, 'Too Long!').required('Required'),
  yearName: Yup.number().min(2018, 'Too Short!').max(2030, 'Too Long!').required('Required'),
});

export const InsertMonthView = withFormik<Props, FormValues>({
    // validateOnChange : false,
    // validateOnBlur: false,
    validationSchema : InsertMonthSchema,
    mapPropsToValues: () =>  ({ edboardName:'', month: 0, goal: 0, yearName: 0, }),
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