import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

const PHDatePiker = ({ name, label }: { name: string; label: string }) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <DatePicker style={{ width: "100%" }} {...field} size="large" />
                    {error ? <small style={{ color: "red" }}>{error.message}</small> : null}
                </Form.Item>
            )}
        />
    );
};

export default PHDatePiker;
