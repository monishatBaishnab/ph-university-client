import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse, TSemesterRegistration } from "../../../types";
import { semesterStatus } from "../../../constants/semesterRegistration";
import PHDatePiker from "../../../components/form/PHDatePiker";
import PHInput from "../../../components/form/PHInput";
import { useCreateSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";

const CreateAcademicSemester = () => {
    const [createSemesterRegistration] = useCreateSemesterRegistrationMutation();
    const { data: aSemesters, isLoading: aSemestersLoading } = useGetAllSemestersQuery([
        { name: "sort", value: "year" },
    ]);
    const aSemestersOptions = aSemesters?.data?.map((semester) => ({
        value: semester?._id,
        label: `${semester?.name} ${semester.year}`,
    }));

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating Semester Registration.");
        const semesterData = {
            ...data,
            minCredit: Number(data.minCredit),
            maxCredit: Number(data.maxCredit),
        };
        console.log(semesterData);
        try {
            const res = (await createSemesterRegistration(
                semesterData
            )) as TResponse<TSemesterRegistration>;

            if (res?.error) {
                console.log(res.error);
                return toast.error(res.error.data.message, { id: toastId });
            }

            if (res.data) {
                toast.success("Successfully created Semester Registration.", { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create Semester Registration.", { id: toastId });
        }
    };

    return (
        <div>
            <h1 style={{ marginBottom: "40px" }}>Semester Registration</h1>
            <Flex justify="center" align="center">
                <Col span={8}>
                    <PHForm
                        // defaultValues={defaultSemesterData}
                        onSubmit={handleSubmit}
                    >
                        <PHSelect
                            disabled={aSemestersLoading}
                            name="academicSemester"
                            label="Academic Semester"
                            options={aSemestersOptions}
                            placeholder="Select a academic semester."
                        />
                        <PHSelect
                            name="status"
                            label="Semester Status"
                            options={semesterStatus}
                            placeholder="Select semester status"
                        />
                        <PHDatePiker name="startDate" label="Semester Start Date" />
                        <PHDatePiker name="endDate" label="Semester End Date" />
                        <PHInput
                            name="minCredit"
                            type="text"
                            label="Min Credit"
                            placeholder="Write semester min credit."
                        />
                        <PHInput
                            name="maxCredit"
                            type="text"
                            label="Max Credit"
                            placeholder="Write semester max credit."
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
