import { useState } from "react";
import {
    useGetAllAcademicFacultiesQuery,
    useGetSingleAcademicFacultyQuery,
    useUpdateAcademicFacultyMutation,
} from "../../../redux/features/admin/academicManagement.api";
import { Button, Modal, Table, TableColumnsType } from "antd";
import PHForm from "../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TAcademicSemester, TResponse } from "../../../types";
import PHInput from "../../../components/form/PHInput";
import { academicFacultySchema } from "../../../schemas";

type TTableData = { name: string; key: string };

const AcademicFaculty = () => {
    const [academicFacultyId, setAcademicFacultyId] = useState("");
    const [updateAcademicFaculty] = useUpdateAcademicFacultyMutation();
    const { data: academicFaculties } = useGetAllAcademicFacultiesQuery(undefined);
    const { data: academicFaculty, isLoading } =
        useGetSingleAcademicFacultyQuery(academicFacultyId);
    const [modalOpen, setModalOpen] = useState(false);
    let defaultValues: { name?: string } = {};

    if (academicFaculty?.data?.name) {
        defaultValues = {
            name: academicFaculty?.data?.name,
        };
    }

    const showModal = (id?: string) => {
        setAcademicFacultyId(id as string);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setAcademicFacultyId("");
    };

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        setModalOpen(false);
        const toastId = toast.loading("Updating Academic Faculty.");
        try {
            const res = (await updateAcademicFaculty({
                data: data,
                id: academicFacultyId,
            })) as TResponse<TAcademicSemester>;

            if (res?.error) {
                console.log(res.error);
                return toast.error(res.error.data.message, { id: toastId });
            }

            if (res.data) {
                toast.success("Successfully update Academic Faculty.", { id: toastId });
                setAcademicFacultyId("undefined");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update Academic Faculty.", { id: toastId });
        }
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
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
    const tableData = academicFaculties?.data?.map(({ _id, name }) => ({
        key: _id,
        name,
    }));
    return (
        <div>
            <h1 style={{ marginBottom: "40px" }}>Academic Faculty</h1>

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
                            resolver={zodResolver(academicFacultySchema)}
                        >
                            <PHInput
                                key="name"
                                name="name"
                                type="text"
                                label="Academic Faculty Name"
                                placeholder="Write Academic Faculty Name."
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

export default AcademicFaculty;
