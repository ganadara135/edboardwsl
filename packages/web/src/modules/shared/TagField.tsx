import * as React from "react";
import { FieldProps,  } from "formik";
import { Form, Select } from 'antd';


export const TagField: React.SFC<
    FieldProps<any> & { prefix: React.ReactNode, label?: string }
> = ({
    field: {onChange, onBlur: _, ...field},
    form: { touched, errors, setFieldValue },
    label,
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
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Tags Mode"
                onChange={(newValue: any) => setFieldValue(field.name, newValue)}
            />
        </Form.Item>
    );
};