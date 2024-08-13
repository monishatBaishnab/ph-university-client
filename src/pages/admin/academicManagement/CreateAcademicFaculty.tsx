import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { facultyNameOptions } from "../../../constants/academicFaculties";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TAcademicFaculty, TResponse } from "../../../types";

const CreateAcademicFaculty = () => {
    const [createAcademicFaculty] = useCreateAcademicFacultyMutation();
    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Create Academic Faculty.");
        try {
            const res = (await createAcademicFaculty(data)) as TResponse<TAcademicFaculty>;
            console.log(res);
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
                        <PHSelect
                            name="name"
                            key="name"
                            label="Academic Faculty Name"
                            placeholder="Select a Academic Faculty"
                            options={facultyNameOptions}
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
