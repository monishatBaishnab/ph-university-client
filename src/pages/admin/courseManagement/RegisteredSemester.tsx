import { useState } from "react";
import {
    useGetAllSemesterRegistrationQuery,
    useUpdateSemesterRegistrationMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { Button, Dropdown, MenuProps, Table, TableColumnsType, Tag } from "antd";
import moment from "moment";
import { semesterStatusOptions } from "../../../constants/semesterRegistration";
import { toast } from "sonner";
import { TResponse, TSemesterRegistration } from "../../../types";

type TTableData = {
    key: string;
    academicSemester: string;
    status: string;
    startDate: string;
    endDate: string;
    minCredit: number;
    maxCredit: number;
};

const RegisteredSemester = () => {
    const [params] = useState([]);
    const [semesterId, setSemesterId] = useState("");
    const [updateRegisteredSemester] = useUpdateSemesterRegistrationMutation();
    const { data: registeredSemesters } = useGetAllSemesterRegistrationQuery(params);

    const handleClick: MenuProps["onClick"] = async (data) => {
        const semesterStatusData = {
            status: data?.key,
        };
        const toastId = toast.loading("Updating semester registration status.");
        try {
            const res = (await updateRegisteredSemester({
                data: semesterStatusData,
                id: semesterId,
            })) as TResponse<TSemesterRegistration>;
            if (res?.error) {
                toast.error(res?.error?.data?.message, { id: toastId });
                return;
            }
            if (res.data) {
                toast.success("Successfully updated semester registration status.", {
                    id: toastId,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update semester registration status.", { id: toastId });
        }
    };

    const menuProps = {
        items: semesterStatusOptions,
        onClick: handleClick,
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Academic Semester",
            dataIndex: "academicSemester",
            key: "academicSemester",
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (item) => {
                return (
                    <Tag
                        color={item === "ONGOING" ? "green" : item === "UPCOMING" ? "blue" : "red"}
                    >
                        {item}
                    </Tag>
                );
            },
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate",
        },
        {
            title: "Max Credit",
            dataIndex: "maxCredit",
            key: "maxCredit",
        },
        {
            title: "Min Credit",
            dataIndex: "minCredit",
            key: "minCredit",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: (item) => {
                return (
                    <Dropdown disabled={item.status === 'ENDED'} menu={menuProps} trigger={["click"]}>
                        <Button
                            onClick={() => setSemesterId(item?.key)}
                            color="green"
                            type="dashed"
                        >
                            Update
                        </Button>
                    </Dropdown>
                );
            },
        },
    ];

    const tableRows = registeredSemesters?.data?.map(
        ({ _id, academicSemester, startDate, endDate, status, maxCredit, minCredit }) => ({
            key: _id,
            academicSemester: `${academicSemester.name} ${academicSemester.year}`,
            minCredit,
            maxCredit,
            status,
            startDate: moment(new Date(startDate)).format("MMMM"),
            endDate: moment(new Date(endDate)).format("MMMM"),
        })
    );

    return (
        <div>
            <h1 style={{ marginBottom: "40px" }}>Registered Semester</h1>
            <Table columns={columns} dataSource={tableRows} />
        </div>
    );
};

export default RegisteredSemester;
