import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
    useCreateAcademicDepartmentMutation,
    useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { TAcademicDepartment, TResponse } from "../../../types";
import { academicDepartmentSchema } from "../../../schemas";

const CreateAcademicDepartment = () => {
    const [createAcademicDepartment] = useCreateAcademicDepartmentMutation();
    const { data: academicFaculties } = useGetAllAcademicFacultiesQuery(undefined);
    const academicFacultyOptions = academicFaculties?.data?.map((faculty) => ({
        value: faculty?._id,
        label: faculty?.name,
    }));

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Create Academic Department.");
        try {
            const res = (await createAcademicDepartment(data)) as TResponse<TAcademicDepartment>;
            if (res?.error) {
                console.log(res.error);
                toast.error(res.error.data.message, { id: toastId });
                return;
            } else if (res.data) {
                toast.success("Successfully created Academic Department.", { id: toastId });
                return;
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create Academic Department", { id: toastId });
        }
    };
    return (
        <div>
            <h1 style={{ marginBottom: "40px" }}>Create Academic Department</h1>

            <Flex justify="center" align="center">
                <Col span={8}>
                    <PHForm
                        onSubmit={handleSubmit}
                        resolver={zodResolver(academicDepartmentSchema)}
                    >
                        <PHInput
                            key="name"
                            type="text"
                            name="name"
                            label="Department Name"
                            placeholder="Write academic faculty name."
                        />
                        <PHSelect
                            name="academicFaculty"
                            key="academicFaculty"
                            label="Faculty Name"
                            placeholder="Select a Academic Faculty"
                            options={academicFacultyOptions!}
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

export default CreateAcademicDepartment;
