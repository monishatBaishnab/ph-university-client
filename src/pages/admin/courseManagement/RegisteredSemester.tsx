import { useState } from "react";
import { useGetAllSemesterRegistrationQuery } from "../../../redux/features/admin/courseManagement.api";
import { Button, Dropdown, MenuProps, Table, TableColumnsType, Tag } from "antd";
import moment from "moment";

type TTableData = {
    key: string;
    academicSemester: string;
    status: string;
    startDate: string;
    endDate: string;
    minCredit: number;
    maxCredit: number;
};

const dropdownItems: MenuProps['items'] = [
    {
        key: "UPCOMING",
        label: "Upcoming",
    },
    {
        key: "ONGOING",
        label: "Ongoing",
    },
    {
        key: "ENDED",
        label: "Ended",
    },
];

const RegisteredSemester = () => {
    const [params] = useState([]);
    const { data: registeredSemesters } = useGetAllSemesterRegistrationQuery(params);

    const handleClick: MenuProps['onClick'] = (data) => {
        console.log(data);
    };

    const menuProps = {
        items: dropdownItems,
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
            dataIndex: "x",
            render: () => (
                <Dropdown menu={menuProps} trigger={['click']}>
                    <Button color="green" type="dashed">
                        Update
                    </Button>
                </Dropdown>
            ),
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
