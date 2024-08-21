import {
    useGetAllSemestersQuery,
    useGetSingleAcademicSemesterQuery,
    useUpdateAcademicSemesterMutation,
} from "../../../redux/features/admin/academicManagement.api";
import { Button, Modal, Table, TableColumnsType, TableProps } from "antd";
import { TAcademicSemester, TResponse } from "../../../types";
import { useState } from "react";
import { nameOptions, yearFilters, yearOptions } from "../../../constants/academicSemesters";
import PHSelect from "../../../components/form/PHSelect";
import PHForm from "../../../components/form/PHForm";
import { monthOptions } from "../../../constants/global";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas";

type TTableData = Pick<TAcademicSemester, "name" | "year" | "startMonth" | "endMonth"> & {
    key: string;
};

type TParam = { name: string; value: string };

const AcademicSemesters = () => {
    const [semesterId, setSemesterId] = useState<string | undefined>(undefined);
    const [params, setParams] = useState<TParam[]>([]);
    const [updateAcademicSemester] = useUpdateAcademicSemesterMutation();
    const { data: academicSemesters } = useGetAllSemestersQuery(params);
    const { data: academicSemester, isLoading } = useGetSingleAcademicSemesterQuery(semesterId);
    const [modalOpen, setModalOpen] = useState(false);

    let defaultValues: { name?: string; year?: string; startMonth?: string; endMonth?: string } =
        {};

    if (academicSemester?.data) {
        defaultValues = {
            name: academicSemester?.data?.code,
            year: academicSemester?.data?.year,
            startMonth: academicSemester?.data?.startMonth,
            endMonth: academicSemester?.data?.endMonth,
        };
    }

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            dataIndex: "name",
            showSorterTooltip: { target: "full-header" },
            filters: [
                {
                    text: "Autumn",
                    value: "Autumn",
                },
                {
                    text: "Summer",
                    value: "Summer",
                },
                {
                    text: "Fall",
                    value: "Fall",
                },
            ],
        },
        {
            title: "Year",
            dataIndex: "year",
            filters: yearFilters,
        },
        {
            title: "Start Month",
            dataIndex: "startMonth",
        },
        {
            title: "End Month",
            dataIndex: "endMonth",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: ({ key }) => (
                <Button onClick={() => showModal(key)} size="middle" type="dashed">
                    Update
                </Button>
            ),
        },
    ];

    const tableData = academicSemesters?.data?.map(({ _id, name, year, startMonth, endMonth }) => ({
        key: _id,
        name,
        year,
        startMonth,
        endMonth,
    }));

    const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === "filter") {
            const queryParams: TParam[] = [];
            filters?.name?.forEach((item) =>
                queryParams.push({ name: "name", value: item as string })
            );
            filters?.year?.forEach((item) =>
                queryParams.push({ name: "year", value: item as string })
            );
            setParams(queryParams);
        }
    };

    const showModal = (id?: string) => {
        setModalOpen(true);
        setSemesterId(id);
    };

    const closeModal = () => {
        setSemesterId(undefined);
        setModalOpen(false);
    };

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        setModalOpen(false);
        const toastId = toast.loading("Creating Academic Semester.");
        try {
            const semesterData = {
                name: nameOptions[Number(data.name) - 1].label,
                code: data.name,
                year: data.year,
                startMonth: data.startMonth,
                endMonth: data.endMonth,
            };
            const res = (await updateAcademicSemester({
                data: semesterData,
                id: semesterId,
            })) as TResponse<TAcademicSemester>;

            if (res?.error) {
                console.log(res.error);
                return toast.error(res.error.data.message, { id: toastId });
            }

            if (res.data) {
                toast.success("Successfully update Academic Semester.", { id: toastId });
                setSemesterId(undefined);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update Academic Semester.", { id: toastId });
        }
    };

    return (
        <div>
            <h1 style={{ marginBottom: "40px" }}>Academic Semesters</h1>

            <Table
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
            />

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

export default AcademicSemesters;
