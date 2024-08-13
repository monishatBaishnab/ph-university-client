import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import { ReactNode } from "react";

const PHInput = ({
    label,
    name,
    type,
    placeholder,
    suffix,
}: {
    label?: string;
    name: string;
    type: string;
    placeholder?: string;
    suffix?: ReactNode;
}) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <Input
                        {...field}
                        variant="outlined"
                        size="large"
                        id={name}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        suffix={suffix}
                    />
                    {error ? <small style={{ color: "red" }}>{error.message}</small> : null}
                </Form.Item>
            )}
        />
    );
};

export default PHInput;
