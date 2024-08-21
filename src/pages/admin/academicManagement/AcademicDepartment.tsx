import { Button, Modal, Table, TableColumnsType } from "antd";
import { useState } from "react";
import {
    useGetAllAcademicDepartmentQuery,
    useGetAllAcademicFacultiesQuery,
    useGetSingleAcademicDepartmentQuery,
    useUpdateAcademicDepartmentMutation,
} from "../../../redux/features/admin/academicManagement.api";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TAcademicDepartment, TResponse } from "../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { academicDepartmentSchema } from "../../../schemas";
type TTableData = { name: string; academicFaculty: string; key: string };

const AcademicDepartment = () => {
    const [updateAcademicDepartment] = useUpdateAcademicDepartmentMutation();
    const [departmentId, setDepartmentId] = useState("");
    const { data: academicDepartments } = useGetAllAcademicDepartmentQuery(undefined);
    const { data: academicDepartment, isLoading } =
        useGetSingleAcademicDepartmentQuery(departmentId);
    const { data: academicFaculties } = useGetAllAcademicFacultiesQuery(undefined);
    const [modalOpen, setModalOpen] = useState(false);
    let defaultValues: { name?: string; academicFaculty?: string } = {};

    if (academicDepartment?.data?.name) {
        defaultValues = {
            name: academicDepartment?.data?.name,
            academicFaculty: academicDepartment?.data?.academicFaculty?._id,
        };
    }
    
    const academicFacultyOptions = academicFaculties?.data?.map((faculty) => ({
        value: faculty?._id,
        label: faculty?.name,
    }));

    const showModal = (id?: string) => {
        setDepartmentId(id as string);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setDepartmentId("");
    };

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        setModalOpen(false);
        const toastId = toast.loading("Updating Academic Faculty.");
        try {
            const res = (await updateAcademicDepartment({
                data: data,
                id: departmentId,
            })) as TResponse<TAcademicDepartment>;

            if (res?.error) {
                console.log(res.error);
                return toast.error(res.error.data.message, { id: toastId });
            }

            if (res.data) {
                toast.success("Successfully update Academic Department.", { id: toastId });
                setDepartmentId("");
            }
        } catch (error) {
            toast.error("Failed to update Academic Department.", { id: toastId });
        }
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Faculty Name",
            dataIndex: "academicFaculty",
        },
        {
            title: "Department Name",
            dataIndex: "name",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: ({ key }: { key: string }) => (
                <Button onClick={() => showModal(key)} size="middle" type="dashed">
                    Update
                </Button>
            ),
        },
    ];
    const tableData = academicDepartments?.data?.map(({ _id, name, academicFaculty }) => ({
        key: _id,
        academicFaculty: academicFaculty?.name,
        name,
    }));
    return (
        <div>
            <h1 style={{ marginBottom: "40px" }}>Academic Department</h1>

            <Table columns={columns} dataSource={tableData} />

            <Modal
                open={modalOpen}
                title="Update Academic Semester"
                onCancel={closeModal}
                footer={<></>}
                loading={defaultValues?.name === undefined}
            >
                <div>
                    {!isLoading && defaultValues?.name !== undefined ? (
                        <PHForm
                            defaultValues={defaultValues}
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
                            <Button htmlType="submit" type="primary">
                                Save
                            </Button>
                        </PHForm>
                    ) : null}
                </div>
            </Modal>
        </div>
    );
};

export default AcademicDepartment;
