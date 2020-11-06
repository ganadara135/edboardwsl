import * as React from "react";
import { FieldProps,  } from "formik";
import { Form, Input, InputNumber } from 'antd';


export const InputField: React.FC< // React.SFC<
    FieldProps<any> & { 
        prefix?: React.ReactNode, 
        label?: string, 
        useNumberComponent?: boolean, 
        suffixIcon?: React.ReactNode, 
        suffixLabel?: string,
        defaultValue?: number
     }
> = ({
    field: {onChange, ...field},
    form: { touched, errors, setFieldValue },
    label,
    useNumberComponent = false,
    ...props
}) => {

    const errorMsg = touched[field.name] && errors[field.name];

    const Comp = useNumberComponent ? InputNumber : Input;

    console.log("suffix : ", props);
    return (
        <Form.Item 
            label={label}
            help={errorMsg}
            validateStatus={errorMsg ? "error" : undefined } 
            style={{ padding:'auto'}}
        >
            <Comp 
                {...field} 
                {...props.meta} 
                // {...props?.prefix}
                // {...props.children} 
                placeholder={field.name}
                // value={props.defaultValue}
                onChange={
                    useNumberComponent 
                    ? (newValue: any) => setFieldValue(field.name, newValue)
                    : onChange
                }
                // {...props.suffix as any}
                {...props as any}
            >
                {props.children}
            </Comp>
            {props.suffixIcon}
            {props.suffixLabel}
        </Form.Item>
    );
};