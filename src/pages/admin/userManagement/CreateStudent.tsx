import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePiker from "../../../components/form/PHDatePiker";
import {
    useGetAllAcademicDepartmentQuery,
    useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagement.api";

const defaultValues = {
    name: {
        firstName: "William",
        middleName: "E.",
        lastName: "Davis",
    },
    gender: "male",
    // dateOfBirth: "1990-06-15",
    email: "william.davis@gmail.com",
    contactNo: "555-6789",
    emergencyContactNo: "555-5432",
    bloogGroup: "O-",
    presentAddress: "509 Oak St, Cityville",
    permanentAddress: "712 Elm St, Cityville",
    guardian: {
        fatherName: "Robert Davis",
        fatherOccupation: "Teacher",
        fatherContactNo: "555-8765",
        motherName: "Michelle Davis",
        motherOccupation: "Nurse",
        motherContactNo: "555-6543",
    },
    localGuardian: {
        name: "Thomas Miller",
        occupation: "Lawyer",
        contactNo: "555-9876",
        address: "914 Pine St, Cityville",
    },
    admissionSemester: "66b99a4726d6f2a007cb7d7f",
    academicDepartment: "66bb7343e085de0566c5d0a2",
};

const CreateStudent = () => {
    const { data: academicDepartments, isLoading: departmentLoading } =
        useGetAllAcademicDepartmentQuery(undefined);
    const { data: academicSemesters, isLoading: semisterLoading } =
        useGetAllSemestersQuery(undefined);
    const [createStudent] = useCreateStudentMutation();
    const academicSemestersOptions = academicSemesters?.data?.map((semester) => ({
        value: semester?._id,
        label: `${semester?.name} ${semester.year}`,
    }));
    const academicDepartmentOptions = academicDepartments?.data?.map((department) => ({
        value: department?._id,
        label: department?.name,
    }));
    console.log(academicSemesters);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        const studentData = {
            password: "student123",
            student: data,
        };

        const studentFormData = new FormData();
        studentFormData.append("data", JSON.stringify(studentData));
        studentFormData.append("file", data.image);
        try {
            const res = await createStudent(studentFormData);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h1 style={{ marginBottom: "40px" }}>Create Student</h1>

            <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <Row>
                    <Col span={24}>
                        <Divider>Personal Info.</Divider>
                        <Row gutter={12}>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="name.firstName"
                                    type="text"
                                    label="First Name"
                                    placeholder="Write first name."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="name.middleName"
                                    type="text"
                                    label="Middle Name"
                                    placeholder="Write middle name."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="name.lastName"
                                    type="text"
                                    label="Last Name"
                                    placeholder="Write last name."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHSelect
                                    name="gender"
                                    label="Gender"
                                    placeholder="Select a gender."
                                    options={[
                                        { label: "Male", value: "male" },
                                        { label: "Female", value: "female" },
                                        { label: "None", value: "none" },
                                    ]}
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHDatePiker name="dateOfBirth" label="Date of Birth" />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="bloogGroup"
                                    label="Blood Group"
                                    placeholder="Write blood group."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <Controller
                                    name="image"
                                    render={({ field: { onChange, value, ...filed } }) => (
                                        <Input
                                            type="file"
                                            onChange={(e) => onChange(e?.target?.files?.[0])}
                                            value={value?.fileName}
                                            {...filed}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Divider>Contact Info.</Divider>
                        <Row gutter={12}>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="email"
                                    type="email"
                                    label="Email"
                                    placeholder="Write email account."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="contactNo"
                                    type="text"
                                    label="Contact No"
                                    placeholder="Write contact no."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="emergencyContactNo"
                                    type="text"
                                    label="Emergency Contact No"
                                    placeholder="Write emergency contact no."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="presentAddress"
                                    type="text"
                                    label="Present Address"
                                    placeholder="Write present Address."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="permanentAddress"
                                    type="text"
                                    label="Permanent Address"
                                    placeholder="Write permanent address."
                                />
                            </Col>
                        </Row>
                        <Divider>Guardian Info.</Divider>
                        <Row gutter={12}>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="guardian.fatherName"
                                    type="text"
                                    label="Father Name"
                                    placeholder="Write father name."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="guardian.fatherOccupation"
                                    type="text"
                                    label="Father Occupation"
                                    placeholder="Write father occupation no."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="guardian.fatherContactNo"
                                    type="text"
                                    label="Father Contact No"
                                    placeholder="Write father contact no."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="guardian.motherName"
                                    type="text"
                                    label="Mother Name"
                                    placeholder="Write mother name."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="guardian.motherOccupation"
                                    type="text"
                                    label="Mother Occupation"
                                    placeholder="Write mother occupation."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="guardian.motherContactNo"
                                    type="text"
                                    label="Mother Contact No"
                                    placeholder="Write mother contact no."
                                />
                            </Col>
                        </Row>
                        <Divider>Local Guardian Info.</Divider>
                        <Row gutter={12}>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="localGuardian.name"
                                    type="text"
                                    label="Name"
                                    placeholder="Write local guardian name."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="localGuardian.occupation"
                                    type="text"
                                    label="Occupation"
                                    placeholder="Write local guardian occupation."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="localGuardian.contactNo"
                                    type="text"
                                    label="Contact No"
                                    placeholder="Write local guardian contact no."
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHInput
                                    name="localGuardian.address"
                                    type="text"
                                    label="Address"
                                    placeholder="Write local guardian address."
                                />
                            </Col>
                        </Row>
                        <Divider>Academic Info.</Divider>
                        <Row gutter={12}>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHSelect
                                    disabled={departmentLoading}
                                    name="academicDepartment"
                                    label="Academic Department"
                                    placeholder="Select a academic department."
                                    options={academicDepartmentOptions!}
                                />
                            </Col>
                            <Col span={24} sm={{ span: "12" }} lg={{ span: 8 }}>
                                <PHSelect
                                    disabled={semisterLoading}
                                    name="admissionSemester"
                                    label="Academic Semester"
                                    placeholder="Select a academic semester."
                                    options={academicSemestersOptions!}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Button htmlType="submit" size="large" type="primary">
                    Submit
                </Button>
            </PHForm>
        </div>
    );
};

export default CreateStudent;
