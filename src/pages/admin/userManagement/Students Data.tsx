import { Button, Pagination, Popconfirm, Space, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudentData } from "../../../types/userManagement.type";

type TTableData = Pick<TStudentData, "id" | "fullName" | "email"> & {
    key: string;
};

type TParam = { name: string; value: string | number };

const StudentsData = () => {
    const [params] = useState<TParam[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: studentsData } = useGetAllStudentQuery([
        ...params,
        { name: "limit", value: 2 },
        { name: "sort", value: "id" },
        { name: "page", value: currentPage },
    ]);
    const metaData = studentsData?.meta;

    const confirm = () => {
        console.log("Confirmed");
    };
    const cancel = () => {
        console.log("Canceled.");
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Student Id",
            dataIndex: "id",
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: () => (
                <Space>
                    <Button size="middle" type="dashed">
                        Details
                    </Button>
                    <Button size="middle" type="dashed">
                        Update
                    </Button>
                    <Popconfirm
                        placement="topRight"
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger type="dashed">
                            Blocked
                        </Button>
                    </Popconfirm>
                </Space>
            ),
            width: "1%",
        },
    ];

    const tableData = studentsData?.data?.map(({ _id, id, fullName, email }) => ({
        key: _id,
        id,
        fullName,
        email,
    }));

    return (
        <div>
            <h1 style={{ marginBottom: "40px" }}>Students Data</h1>

            <Table pagination={false} columns={columns} dataSource={tableData} />
            <Pagination
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
                total={metaData?.total}
                pageSize={metaData?.limit}
            />
        </div>
    );
};

export default StudentsData;
