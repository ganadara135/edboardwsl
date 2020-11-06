import * as React from "react";
import { FieldProps,  } from "formik";
import { Form, Select } from 'antd';

export const SelectField: React.SFC<
    FieldProps<any> & { prefix: React.ReactNode, label?: string, listing?: number[] }
> = ({
    field: {onChange, ...field},
    form: { touched, errors, setFieldValue },
    label,
    listing,
    ...props
}) => {

    const errorMsg = touched[field.name] && errors[field.name];

    // const selectOptionListing = (
    //     listing?.map((l:any, i) =>  
    //     <Select.Option key={i} value={l as number}>{l as number}</Select.Option>)
    // );
    const selectOptionListing = (
        listing?.map((l:any, i) =>  
        <Select.Option key={i} value={l}>{l}</Select.Option>)
    );

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
                {selectOptionListing}
            </Select>
        </Form.Item>
    );
};