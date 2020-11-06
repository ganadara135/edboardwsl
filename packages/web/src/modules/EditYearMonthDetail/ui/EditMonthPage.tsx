import * as React from "react";
import { GetMonthController } from "@abb/controller";
// import { RouteComponentProps } from "react-router-dom";
import { Form, Field, FormikProps, withFormik } from 'formik';
import { Button } from 'antd';
// import { SelectField } from "../../shared/SelectField";
import { FireOutlined } from "@ant-design/icons";
import { InputField } from "../../shared/InputField";
import { InputMonthField } from "../../shared/InputMonthField";
import * as Yup from "yup";

export interface FormValues {  // extends InsertMonthMutationVariables{
  m_id: string;
  month: number;
  goal: number;
  description: string;
  y_id: string;
  year: number;
}

interface Props extends FormValues {
  onFinish: () => void;
  submit: (values: FormValues) => Promise<FormValues | null>;
}

// 아래 것은 모두 Props 을 하나로 묶는 방법
class C extends React.PureComponent<FormikProps<FormValues> & Props>{
  // constructor(props: any){
  //   super(props);
  //   this.state = {y_id: '', year: 2020, goal: 0, description: ''};
  // }
  
  render() {
    console.log("children: ", this.props.children)
    const {  errors, touched} = this.props;
    const { message }: any = errors;
    console.log(" errors props : ", errors)
    console.log("this.props: ", this.props);
    return (
      <GetMonthController m_id={this.props.children as string}>
        {(data: { loading: any; getData: any; }) => {
          if (data.loading) {
            return <div style={{ display: "flex", justifyContent: "center" }}>...loading</div>;
          }
          console.log("data.getData : ", data.getData)
          return (
            // <Form style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}> 
            <Form style={{ margin:'auto', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "space-between" }}>
              {/* <div style={{width: 300, marginLeft: 100, marginRight: 20}}> */}
                <Field
                  name="m_id"
                  type="hidden"
                  component={InputField}
                />
                <Field
                  name="y_id"
                  type="hidden"
                  component={InputField}
                />
                <Field
                  name="year"
                  type="hidden"
                  component={InputField}
                />
                <Field  
                  name="month"
                  label="목표월"
                  pickerVal="month"
                  yearName={2020}
                  component={InputMonthField}
                />
                <Field
                  name="goal"
                  label="목표전력"
                  useNumberComponent={true}
                  // defaultValue={data.getData?.goal}
                  component={InputField}
                  suffixIcon={
                    <FireOutlined style={{ margin: 10}}/>
                  }
                  suffixLabel=" 단위:  kW"
                />
                <Field  
                  name="description"
                  label="설명"
                  // defaultValue={data.getData?.description}
                  component={InputField}                 
                />
                
                {errors && touched ? ( <div style={{color:'red', margin:'auto'}}>{message}</div> ) : null}
                <Button type="primary" htmlType="submit" className="">
                  수정버튼
                </Button>

            </Form>
          )
        }}
      </GetMonthController>
    );
  }
}

const EditMonthSchema = Yup.object().shape({
  month: Yup.number().min(0, 'Too Short!').max(12, 'Too Long!').required('Required'),
  goal: Yup.number().min(1, 'Too Short!').max(99999, 'Too Long!').required('Required'),
});

export const EditMonthPage = withFormik<Props, FormValues>({
  // enableReinitialize: true,
  validationSchema : EditMonthSchema,
  mapPropsToValues: (props: Props) =>  ({ m_id: props.m_id, month: props.month, 
    goal: props.goal, description: props.description, 
    y_id: props.y_id, year: props.year }),
  handleSubmit: async (values, {props, setErrors}) => {
    console.log("handleSubmit: ", values)
    const errors = await props.submit(values);
    
    if(errors){
      console.log("error : ", errors)
      setErrors(errors as any)
    } else {
      props.onFinish();
    }
  }
})(C);