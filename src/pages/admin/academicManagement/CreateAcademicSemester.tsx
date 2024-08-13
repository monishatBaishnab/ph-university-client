import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { nameOptions, yearOptions } from "../../../constants/academicSemesters";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TAcademicSemester, TResponse } from "../../../types";

const CreateAcademicSemester = () => {
    const [createAcademicSemester] = useCreateAcademicSemesterMutation();

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating Academic Semester.");
        try {
            const semesterData = {
                name: nameOptions[Number(data.name) - 1].label,
                code: data.name,
                year: data.year,
                startMonth: data.startMonth,
                endMonth: data.endMonth,
            };
            const res = (await createAcademicSemester(
                semesterData
            )) as TResponse<TAcademicSemester>;

            if (res?.error) {
                console.log(res.error);
                return toast.error(res.error.data.message, { id: toastId });
            }

            if (res.data) {
                toast.success("Successfully created Academic Semester.",  { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create Academic Semester.", { id: toastId });
        }
    };

    return (
        <div>
            <h1>Create Academic Semester</h1>
            <Flex justify="center" align="center">
                <Col span={8}>
                    <PHForm
                        // defaultValues={defaultSemesterData}
                        onSubmit={handleSubmit}
                        resolver={zodResolver(academicSemesterSchema)}
                    >
                        <PHSelect
                            name="name"
                            label="Semester Name"
                            options={nameOptions}
                            placeholder="Select a Name"
                        />
                        <PHSelect
                            name="year"
                            label="Semester Year"
                            options={yearOptions}
                            placeholder="Select a Year"
                        />
                        <PHSelect
                            name="startMonth"
                            label="Start Month"
                            options={monthOptions}
                            placeholder="Select a Start Month"
                        />
                        <PHSelect
                            name="endMonth"
                            label="End Month"
                            options={monthOptions}
                            placeholder="Select a End Month"
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

export default CreateAcademicSemester;
