import { Input } from "antd";
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
    suffix?: ReactNode
}) => {
    return (
        <div
            style={{
                marginBottom: "10px",
            }}
        >
            <div style={{ marginBottom: "4px" }}>
                {label ? (
                    <label
                        style={{
                            fontFamily: "sans-serif",
                            color: "rgba(0, 0, 0, 0.88)",
                            fontSize: "14px",
                        }}
                        htmlFor={name}
                    >
                        {label}
                    </label>
                ) : null}
            </div>
            <Controller
                name={name}
                render={({ field }) => (
                    <Input
                        {...field}
                        variant="outlined"
                        id={name}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        suffix={suffix}
                    />
                )}
            />
        </div>
    );
};

export default PHInput;
