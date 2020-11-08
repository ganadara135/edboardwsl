import * as React from "react";
import { FieldProps,  } from "formik";
import { Form, Select } from 'antd';


export const LabelField: React.SFC<
    FieldProps<any> & { prefix: React.ReactNode, label?: string, edValue: string }
> = ({
    field: {onChange, onBlur: _, ...field},
    form: { touched, errors, setFieldValue },
    label,
    edValue,
    ...props
}) => {

    const errorMsg = touched[field.name] && errors[field.name];

    return (
        <Form.Item 
            label={label}
            help={errorMsg}
            validateStatus={errorMsg ? "error" : undefined } 
        >

            <Select         
                {...field}
                {...props}
                onChange={
                    (newValue: any) => setFieldValue(field.name, newValue)
                }
            >
                 <Select.Option key={9} value={edValue}>{edValue}</Select.Option>)
            </Select>
        </Form.Item>
    );
};