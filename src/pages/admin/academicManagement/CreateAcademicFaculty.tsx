import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TAcademicFaculty, TResponse } from "../../../types";
import PHInput from "../../../components/form/PHInput";
import { academicFacultySchema } from "../../../schemas";

const CreateAcademicFaculty = () => {
    const [createAcademicFaculty] = useCreateAcademicFacultyMutation();
    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Create Academic Faculty.");
        try {
            const res = (await createAcademicFaculty(data)) as TResponse<TAcademicFaculty>;
            if (res?.error) {
                console.log(res.error);
                toast.error(res.error.data.message, { id: toastId });
                return;
            } else if (res.data) {
                toast.success("Successfully created Academic Faculty.", { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create Academic Faculty", { id: toastId });
        }
    };

    return (
        <div>
            <h1 style={{ marginBottom: "40px" }}>Academic Faculty</h1>

            <Flex justify="center" align="center">
                <Col span={8}>
                    <PHForm onSubmit={handleSubmit} resolver={zodResolver(academicFacultySchema)}>
                        <PHInput
                            key="name"
                            name="name"
                            type="text"
                            label="Academic Faculty Name"
                            placeholder="Write Academic Faculty Name."
                        />
                        <Button htmlType="submit" size="large" type="primary">
                            Save
                        </Button>
                    </PHForm>
                </Col>
            </Flex>
        </div>
    );
};

export default CreateAcademicFaculty;
