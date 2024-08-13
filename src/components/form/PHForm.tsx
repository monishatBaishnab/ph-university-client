import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, Resolver, SubmitHandler, useForm } from "react-hook-form";

type TFormConfig = {
    defaultValues?: Record<string, unknown>;
    resolver?: Resolver<FieldValues>;
};

type TPHFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
} & TFormConfig;

const PHForm = ({ onSubmit, children, defaultValues, resolver }: TPHFormProps) => {
    const formConfig: TFormConfig = {};

    if (defaultValues) {
        formConfig["defaultValues"] = defaultValues;
    }
    if (resolver) {
        formConfig["resolver"] = resolver;
    }
    console.log(formConfig);
    const methods = useForm(formConfig);

    return (
        <FormProvider {...methods}>
            <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
                {children}
            </Form>
        </FormProvider>
    );
};

export default PHForm;
