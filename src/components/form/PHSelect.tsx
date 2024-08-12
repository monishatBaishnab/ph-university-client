import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelect = {
    name: string;
    label?: string;
    options: { value: string; label: string; disabled?: boolean }[];
    placeholder?: string;
};

const PHSelect = ({ name, label, options, placeholder }: TPHSelect) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <>
                    <Form.Item label={label}>
                        <Select
                            {...field}
                            size="large"
                            style={{ width: "100%" }}
                            options={options}
                            placeholder={placeholder}
                        />
                        {error ? <small style={{ color: "red" }}>{error.message}</small> : null}
                    </Form.Item>
                </>
            )}
        />
    );
};

export default PHSelect;
