import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import {
    useCreateCourseMutation,
    useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { Button, Col, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { TCourses, TResponse } from "../../../types";

const CreateCourse = () => {
    const [createCourse] = useCreateCourseMutation();
    const { data: previousCourses } = useGetAllCoursesQuery(undefined);

    const preRequisiteCoursesOptions = previousCourses?.data?.map((item) => ({
        label: item.title,
        value: item._id,
    }));

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating new course.");
        const courseData = {
            ...data,
            code: Number(data.code),
            credits: Number(data.credits),
            preRequisiteCourses: data?.preRequisiteCourses?.map((item: string) => ({
                course: item,
                isDeleted: false,
            })),
        };

        try {
            const res = (await createCourse(courseData)) as TResponse<TCourses>;
            if (res?.error) {
                toast.error(res?.error?.data?.message, { id: toastId });
                return;
            }
            if (res?.data) {
                toast.success("Successfully course created.", { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create course.", { id: toastId });
        }
    };
    return (
        <div>
            <h1 style={{ marginBottom: "40px" }}>Create Courses</h1>

            <Row align={"middle"} justify={"center"}>
                <Col span={12}>
                    <PHForm onSubmit={handleSubmit}>
                        <PHInput
                            name="title"
                            type="text"
                            label="Course Title"
                            placeholder="Write a title for course."
                        />
                        <PHInput
                            name="prefix"
                            type="text"
                            label="Corse Prefix"
                            placeholder="Write a prefix for course."
                        />
                        <PHInput
                            name="code"
                            type="text"
                            label="Code"
                            placeholder="Write a course code."
                        />
                        <PHInput
                            name="credits"
                            type="text"
                            label="Credits"
                            placeholder="Write a course credits."
                        />
                        <PHSelect
                            mode="multiple"
                            name="preRequisiteCourses"
                            label="Course Prerequisites"
                            placeholder="Select course prerequisite"
                            options={preRequisiteCoursesOptions}
                        />
                        <Button htmlType="submit" type="primary" size="large">
                            Save
                        </Button>
                    </PHForm>
                </Col>
            </Row>
        </div>
    );
};

export default CreateCourse;
